import { aboutFaq, definitions } from './site-facts.mjs'

const absolute = (site, path) => (path && path.startsWith('http') ? path : site.url + (path || '/'))
const iso = (value) => new Date(value).toISOString()

const personId = (site) => `${site.url}/about/#person`
const websiteId = (site) => `${site.url}/#website`
const extensionDevId = (site) => `${site.url}/about/#extension-dev`
const extensionJsId = (site) => `${site.url}/about/#extension-js`

const compactPerson = (site) => ({
  '@type': 'Person',
  '@id': personId(site),
  name: 'Cezar Augusto',
  url: `${site.url}/about/`
})

const compactWebsite = (site) => ({
  '@type': 'WebSite',
  '@id': websiteId(site),
  name: site.title,
  url: `${site.url}/`
})

const website = (site) => ({
  ...compactWebsite(site),
  description: site.description,
  inLanguage: 'en',
  author: { '@id': personId(site) },
  publisher: { '@id': personId(site) }
})

const extensionDev = (site) => ({
  '@type': 'Organization',
  '@id': extensionDevId(site),
  name: 'extension.dev',
  url: 'https://extension.dev',
  description: definitions.extensionDev,
  foundingDate: '2026-05',
  founder: { '@id': personId(site) },
  sameAs: ['https://github.com/extensiondev', 'https://www.npmjs.com/org/extension.dev']
})

const extensionJs = (site) => ({
  '@type': 'SoftwareSourceCode',
  '@id': extensionJsId(site),
  name: 'Extension.js',
  description: definitions.extensionJs,
  url: 'https://extension.js.org',
  codeRepository: 'https://github.com/extension-js/extension.js',
  programmingLanguage: 'TypeScript',
  license: 'https://opensource.org/licenses/MIT',
  dateCreated: '2020-10-22',
  creator: { '@id': personId(site) },
  sameAs: ['https://www.npmjs.com/package/extension']
})

const person = (site) => ({
  ...compactPerson(site),
  alternateName: '@cezaraugusto',
  image: absolute(site, site.avatar.src),
  description: site.bio,
  jobTitle: 'Founder of extension.dev',
  worksFor: { '@id': extensionDevId(site) },
  alumniOf: {
    '@type': 'Organization',
    name: 'Brave',
    url: 'https://brave.com'
  },
  knowsAbout: [
    'Browser extensions',
    'Cross-browser extension development',
    'Manifest V3',
    { '@id': extensionJsId(site) }
  ],
  homeLocation: { '@type': 'Place', name: 'Rio de Janeiro, Brazil' },
  sameAs: Object.values(site.profiles)
})

export default function structuredData ({ site, page, data, ogImage }) {
  if (data.noindex) return ''

  const url = absolute(site, page.url)
  const author = { '@id': personId(site) }
  const graph = []
  const modified = (fallback) => (data.updated ? iso(data.updated) : fallback)

  if (page.url === '/') {
    graph.push(website(site), compactPerson(site))
  } else if (page.url === '/about/') {
    const faq = aboutFaq(data.projects, site)
    graph.push(
      compactWebsite(site),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: data.title,
        dateModified: modified(undefined),
        isPartOf: { '@id': websiteId(site) },
        mainEntity: person(site)
      },
      extensionDev(site),
      extensionJs(site),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        isPartOf: { '@id': websiteId(site) },
        mainEntity: faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer }
        }))
      }
    )
  } else if (data.layout === 'layouts/post') {
    const published = iso(data.page.date)
    graph.push(compactWebsite(site), compactPerson(site), {
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: data.title,
      description: data.description || data.summary || undefined,
      datePublished: published,
      dateModified: modified(published),
      image: ogImage,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en',
      keywords: (data.tags || []).filter((tag) => tag !== 'posts'),
      author,
      publisher: author,
      isPartOf: { '@id': websiteId(site) },
      sameAs: typeof data.substackUrl === 'string' ? data.substackUrl : undefined
    })
  } else if (page.url === '/blog/') {
    graph.push(compactWebsite(site), compactPerson(site), {
      '@type': 'Blog',
      '@id': `${url}#blog`,
      url,
      name: `${data.title} · ${site.title}`,
      author,
      publisher: author,
      isPartOf: { '@id': websiteId(site) },
      blogPost: (data.collections?.posts || []).map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${absolute(site, post.url)}#post`,
        headline: post.data.title,
        url: absolute(site, post.url),
        datePublished: iso(post.date)
      }))
    })
  } else if (data.title) {
    graph.push(compactWebsite(site), compactPerson(site), {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: data.title,
      author,
      isPartOf: { '@id': websiteId(site) }
    })
  }

  if (!graph.length) return ''
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c')
}
