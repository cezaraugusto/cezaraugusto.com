async function fetchGitHubData() {
  const url =
    'https://api.github.com/users/cezaraugusto/repos?page=1&per_page=100'
  const response = await window.fetch(url)

  return response.json()
}

function sortByPopularity(repos) {
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
}

async function loadProjects() {
  const data = await fetchGitHubData()
  const repos = sortByPopularity(data)

  const ownPublicRepos = []

  for (const repo of repos) {
    // Ignore forks
    if (repo.fork) continue
    // Ignore archived
    if (repo.archived) continue
    // Ignore this own website
    if (repo.name === 'cezaraugusto.com') continue
    // Ignore GH sponsor files
    if (repo.name === '.github') continue

    ownPublicRepos.push({
      name: repo.name,
      url: repo.html_url,
      description: repo.description
    })
  }

  return ownPublicRepos
}

function cacheProjects(projects) {
  window.localStorage.setItem('github-projects', JSON.stringify(projects))
}

function renderProjects(projects) {
  const ol = document.getElementById('projects')

  if (!ol) return

  // ol.removeChild(ol.firstElementChild)

  projects.forEach((repo) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const span = document.createElement('span')

    a.href = repo.url
    a.innerText = repo.name
    span.innerText = ` - ${repo.description}`

    ol.appendChild(li)
    li.appendChild(a)
    li.appendChild(span)
  })
}

async function renderToPage() {
  const cachedData = window.localStorage.getItem('github-projects')

  if (cachedData) {
    renderProjects(JSON.parse(cachedData))
  } else {
    const projects = await loadProjects()

    renderProjects(projects)
    cacheProjects(projects)
  }
}

renderToPage()
