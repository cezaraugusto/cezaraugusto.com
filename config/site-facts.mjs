const compact = (value) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)

const thousands = (value) => new Intl.NumberFormat('en-US').format(value)

const byName = (projects, fullName) =>
  (projects || []).find((project) => project.fullName.toLowerCase() === fullName.toLowerCase())

const monthly = (project) => (project && typeof project.downloads === 'number' ? project.downloads : null)

export const definitions = {
  extensionJs: 'Extension.js is an open-source, MIT-licensed framework for building browser extensions for Chrome, Edge, Firefox and Safari from one codebase.',
  extensionDev: 'extension.dev is a platform where developers build, preview, and publish browser extensions for every major browser.'
}

export function projectStats (projects, site) {
  const list = projects || []
  const downloads = list.reduce((sum, project) => sum + (monthly(project) || 0), 0)
  const packages = list.filter((project) => monthly(project) !== null).length
  const brave = site && site.brave
  const braveExact = brave ? (new Date(brave.end) - new Date(brave.start)) / (365.25 * 24 * 3600 * 1000) : 0
  const braveYears = Math.round(braveExact)
  const launcher = monthly(byName(list, 'cezaraugusto/chromium-edge-launcher'))
  const extensionJs = monthly(byName(list, 'extension-js/extension.js'))
  return {
    count: list.length,
    downloads,
    packages,
    braveYears,
    braveNearly: braveExact < braveYears,
    launcher,
    extensionJs,
    downloadsLabel: downloads ? compact(downloads) : '',
    launcherLabel: launcher ? compact(launcher) : '',
    extensionJsLabel: extensionJs ? thousands(extensionJs) : ''
  }
}

export function aboutFaq (projects, site) {
  const stats = projectStats(projects, site)
  const faq = [
    {
      question: 'Who is Cezar Augusto?',
      answer: `Cezar Augusto is a software developer from Rio de Janeiro, Brazil. He created Extension.js, founded extension.dev, and spent ${stats.braveNearly ? 'nearly ' : ''}${stats.braveYears === 4 ? 'four' : stats.braveYears} years on the Brave browser team as a Senior Software Engineer.`
    },
    {
      question: 'What is Extension.js?',
      answer: `${definitions.extensionJs} Cezar Augusto created it in October 2020.${stats.extensionJsLabel ? ` Its npm package, extension, gets ${stats.extensionJsLabel} downloads a month.` : ''}`
    },
    {
      question: 'What is extension.dev?',
      answer: `${definitions.extensionDev} Cezar Augusto is its founder.`
    }
  ]
  if (stats.downloads && stats.launcher) {
    faq.push({
      question: `Where does the figure of ${stats.downloadsLabel} npm downloads a month come from?`,
      answer: `It is the sum of last month's npm downloads across the ${stats.packages} packages Cezar Augusto publishes. One package, chromium-edge-launcher, a Node.js module that launches Microsoft Edge, accounts for about ${stats.launcherLabel} of them.`
    })
  }
  return faq
}
