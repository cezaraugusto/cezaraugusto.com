import { readFileSync } from 'node:fs'
import EleventyFetch from '@11ty/eleventy-fetch'

const site = JSON.parse(readFileSync(new URL('./site.json', import.meta.url), 'utf8'))
const OWNER = 'cezaraugusto'
const EXCLUDED = new Set(Object.keys(site.excludeProjects || {}).map((name) => name.toLowerCase()))
const EXCLUDED_PATTERN = site.excludeProjectPattern ? new RegExp(site.excludeProjectPattern, 'i') : null
const isExcluded = (repo) =>
  EXCLUDED.has(repo.full_name.toLowerCase()) || Boolean(EXCLUDED_PATTERN && EXCLUDED_PATTERN.test(repo.name))
const EXTRA_REPOS = ['extension-js/extension.js', 'extensiondev/mcp']
const NPM_OVERRIDES = { 'extension-js/extension.js': 'extension' }
const DURATION = '1d'

const githubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'cezaraugusto.com-build'
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

const fetchJson = (url, headers) =>
  EleventyFetch(url, {
    duration: DURATION,
    type: 'json',
    fetchOptions: headers ? { headers } : undefined
  })

const fetchOptional = (requestId, url) =>
  EleventyFetch(
    async () => {
      const response = await fetch(url)
      if (response.status === 404) return { missing: true }
      if (!response.ok) throw new Error(`${url} answered ${response.status}`)
      return response.json()
    },
    { duration: DURATION, type: 'json', requestId }
  )

const compact = (value) =>
  typeof value === 'number'
    ? new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
    : undefined

const warn = (message) => console.warn(`[projects] ${message}`)

async function fetchOwnRepos () {
  const repos = []
  for (let page = 1; page <= 5; page++) {
    const batch = await fetchJson(
      `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`,
      githubHeaders()
    )
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !repo.private &&
      !isExcluded(repo)
  )
}

async function fetchExtraRepos () {
  const repos = []
  for (const fullName of EXTRA_REPOS) {
    try {
      const repo = await fetchJson(`https://api.github.com/repos/${fullName}`, githubHeaders())
      if (repo.private || isExcluded(repo)) {
        warn(`${fullName} is private or excluded, skipping`)
        continue
      }
      repos.push(repo)
    } catch (error) {
      warn(`${fullName}: ${error.message}`)
    }
  }
  return repos
}

const repositoryMatches = (manifest, fullName) => {
  const url = typeof manifest.repository === 'string' ? manifest.repository : manifest.repository?.url
  return (url || '').toLowerCase().includes(fullName.toLowerCase())
}

async function resolvePackageName (repo) {
  let name = NPM_OVERRIDES[repo.full_name]
  if (!name) {
    const manifest = await fetchOptional(
      `package-json:${repo.full_name}@${repo.default_branch}`,
      `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/package.json`
    )
    if (manifest.missing || manifest.private || !manifest.name) return null
    name = manifest.name
  }
  const published = await fetchOptional(
    `npm-latest:${name}`,
    `https://registry.npmjs.org/${name.replace('/', '%2f')}/latest`
  )
  if (published.missing || !repositoryMatches(published, repo.full_name)) return null
  return name
}

async function fetchDownloads (names) {
  const downloads = {}
  const scoped = names.filter((name) => name.startsWith('@'))
  const unscoped = names.filter((name) => !name.startsWith('@'))
  const point = (query) => `https://api.npmjs.org/downloads/point/last-month/${query}`

  for (let i = 0; i < unscoped.length; i += 128) {
    const chunk = unscoped.slice(i, i + 128)
    try {
      const data = await fetchJson(point(chunk.join(',')))
      if (chunk.length === 1) {
        downloads[chunk[0]] = data.downloads
      } else {
        for (const name of chunk) {
          if (data[name]) downloads[name] = data[name].downloads
        }
      }
    } catch (error) {
      warn(`npm downloads: ${error.message}`)
    }
  }

  for (const name of scoped) {
    try {
      const data = await fetchJson(point(name))
      downloads[name] = data.downloads
    } catch (error) {
      warn(`npm downloads for ${name}: ${error.message}`)
    }
  }

  return downloads
}

export default async function () {
  let repos
  try {
    repos = [...(await fetchOwnRepos()), ...(await fetchExtraRepos())]
  } catch (error) {
    warn(`GitHub API failed with no usable cache, building with an empty list: ${error.message}`)
    return []
  }

  const packages = await Promise.all(
    repos.map((repo) =>
      resolvePackageName(repo).catch((error) => {
        warn(`package lookup for ${repo.full_name}: ${error.message}`)
        return null
      })
    )
  )
  const downloads = await fetchDownloads(packages.filter(Boolean))

  return repos
    .map((repo, index) => ({
      fullName: repo.full_name,
      name: repo.owner.login === OWNER ? repo.name : repo.full_name,
      url: repo.html_url,
      description: repo.description || '',
      npm: packages[index],
      downloads: packages[index] ? downloads[packages[index]] : undefined,
      stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : undefined
    }))
    .map((project) => ({
      ...project,
      downloadsLabel: compact(project.downloads),
      starsLabel: compact(project.stars)
    }))
    .sort((a, b) => {
      const aHas = typeof a.downloads === 'number'
      const bHas = typeof b.downloads === 'number'
      if (aHas !== bHas) return aHas ? -1 : 1
      if (aHas && a.downloads !== b.downloads) return b.downloads - a.downloads
      return a.name.localeCompare(b.name)
    })
}
