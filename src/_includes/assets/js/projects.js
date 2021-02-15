async function fetchGitHubData () {
  const url = 'https://api.github.com/users/cezaraugusto/repos?page=1&per_page=100'
  const response = await window.fetch(url)

  return response.json()
}

function sortByPopularity (repos) {
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
}

async function loadProjects () {
  const data = await fetchGitHubData()
  const repos = sortByPopularity(data)

  const ownPublicRepos = []

  for (const repo of repos) {
    // Ignore forks
    if (repo.fork) continue
    // Ignore archived
    if (repo.archived) continue
    // Ignore this own website
    if (repo.name === 'cezaraugusto.net') continue

    ownPublicRepos.push({
      name: repo.name,
      url: repo.html_url,
      description: repo.description
    })
  }

  return ownPublicRepos
}

function cacheProjects (projects) {
  window.localStorage.setItem('projects', JSON.stringify(projects))
}

function rederProjects (projects) {
  const ol = document.getElementById('projects')

  ol.removeChild(ol.firstElementChild)

  projects.forEach((repo) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const p = document.createElement('p')

    console.log('arhhhh', repo)
    a.href = repo.url
    a.class = repo.archived ? 'archived' : ''
    a.innerHTML = (
      repo.name +
      (repo.archived ? ' <sup>Archived!</sup>' : '')
    )
    p.innerText = repo.description

    ol.appendChild(li)
    li.appendChild(a)
    li.appendChild(p)
  })
}

async function renderToPage () {
  const cachedData = window.localStorage.getItem('projects')

  if (cachedData) {
    rederProjects(JSON.parse(cachedData))
  } else {
    const projects = await loadProjects()

    rederProjects(projects)
    cacheProjects(projects)
  }
}

renderToPage()
