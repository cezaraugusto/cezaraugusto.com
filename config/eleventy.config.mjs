import path from 'node:path'
import {DateTime} from 'luxon'
import pluginRss from '@11ty/eleventy-plugin-rss'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import Shiki from '@shikijs/markdown-it'
import Figure from '../src/_includes/components/Figure.js'
import GenerateRobotsTXTRules from '../src/_includes/components/GenerateRobotsTXTRules.js'
import structuredData from './structured-data.mjs'
import { createOgCards } from './og-cards.mjs'
import { createSiteIcons } from './site-icons.mjs'
import { aboutFaq, definitions, projectStats } from './site-facts.mjs'

const CONTENT_SIZES = '(min-width: 710px) 684px, 100vw'
const CONTENT_WIDTHS = '360,720,1440'

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
const dropClass = (node) => {
  delete node.properties.class
}

const keepSakuraBackground = (node) => {
  dropClass(node)
  node.properties.style = node.properties.style.replace(/(^|;)(background-color|--shiki-dark-bg):[^;]+/g, '')
}

const codeBackground = [0xf1, 0xf1, 0xf1]
const codeBackgroundDark = [0x4a, 0x4a, 0x4a]
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const readableOnCode = (hex, background = codeBackground, step = (channel) => Math.floor(channel * 0.95)) => {
  let rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  while (contrast(rgb, background) < 4.6) {
    rgb = rgb.map(step)
  }
  return '#' + rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')
}
const readableOnDarkCode = (hex) => readableOnCode(hex, codeBackgroundDark, (channel) => Math.min(255, Math.ceil(channel + (255 - channel) * 0.05)))
const readableTokenColors = (node) => {
  if (typeof node.properties.style === 'string') {
    node.properties.style = node.properties.style
      .replace(/(^|;)color:(#[0-9a-fA-F]{6})/, (_, lead, hex) => `${lead}color:${readableOnCode(hex)}`)
      .replace(/--shiki-dark:(#[0-9a-fA-F]{6})/, (_, hex) => `--shiki-dark:${readableOnDarkCode(hex)}`)
      .replace(/^;+/, '')
  }
}

const accessibleCodeBlock = {
  pre (node) {
    keepSakuraBackground(node)
    readableTokenColors(node)
    const lang = this.options.lang
    node.properties.tabindex = '0'
    node.properties.role = 'group'
    node.properties['aria-label'] = lang && lang !== 'text' ? `Code sample (${lang})` : 'Code sample'
  },
  code: dropClass,
  line: dropClass,
  span: readableTokenColors
}

md.use(
  await Shiki({
    themes: { light: 'github-light', dark: 'github-dark' },
    langs: ['diff', 'solidity', 'json', 'javascript', 'typescript', 'bash', 'html', 'css'],
    langAlias: {sol: 'solidity'},
    fallbackLanguage: 'text',
    transformers: [accessibleCodeBlock]
  })
)

const markdown = md.use(anchor, {
  level: [2],
  permalink: anchor.permalink.headerLink({safariReaderFix: true, class: false}),
  permalinkBefore: true,
  permalinkSymbol: ''
})

export default (eleventyConfig) => {
  const parseDate = (str) => {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, {zone: 'utc'})
    return date.toJSDate()
  }

  eleventyConfig.addPreprocessor('drafts', '*', (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') {
      return false
    }
  })

  eleventyConfig.htmlTransformer.addPosthtmlPlugin('html', () => (tree) => {
    tree.match({ tag: 'img' }, (node) => {
      const attrs = node.attrs || {}
      const src = String(attrs.src || '')
      if (src.endsWith('.svg') || /^(https?:)?\/\//.test(src)) {
        attrs['eleventy:ignore'] = ''
      } else {
        if (!attrs['eleventy:widths']) attrs['eleventy:widths'] = CONTENT_WIDTHS
        if (src.endsWith('.gif') && !attrs['eleventy:formats']) attrs['eleventy:formats'] = 'webp,gif'
      }
      node.attrs = attrs
      return node
    })
    return tree
  }, { priority: 1 })

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'auto'],
    widths: CONTENT_WIDTHS.split(',').map(Number),
    sharpOptions: { animated: true },
    sharpPngOptions: { palette: true, quality: 85, effort: 10, compressionLevel: 9 },
    filenameFormat: (id, src, width, format) => `${path.parse(src).name}-${id}-${width}.${format}`,
    defaultAttributes: { loading: 'lazy', decoding: 'async', sizes: CONTENT_SIZES }
  })

  // Plugins
  eleventyConfig.addPlugin(pluginRss)

  const ogCards = createOgCards({ avatarPath: 'src/static/images/cezaraugusto.png', siteHost: 'cezaraugusto.com' })
  eleventyConfig.on('eleventy.before', () => ogCards.reset())
  eleventyConfig.on('eleventy.after', ({ directories, dir }) => ogCards.render((directories || dir).output))
  eleventyConfig.addFilter('og_card', (url, title, kicker) => ogCards.register(url, title, kicker))
  eleventyConfig.addGlobalData('ogCardSize', { width: ogCards.width, height: ogCards.height })

  const siteIcons = createSiteIcons({
    avatarPath: 'config/brand/avatar-460.png',
    name: 'Cezar Augusto',
    description: 'Cezar Augusto writes about building cross-browser extensions, Manifest V3 and extension tooling.'
  })
  eleventyConfig.on('eleventy.after', ({ directories, dir }) => siteIcons.render((directories || dir).output))

  eleventyConfig.addFilter('lastmod', (entry, posts) => {
    const dates = [entry.data.updated ? parseDate(entry.data.updated) : entry.date]
    if (entry.url === '/' || entry.url === '/blog/') {
      for (const post of posts || []) dates.push(post.data.updated ? parseDate(post.data.updated) : post.date)
    }
    return new Date(Math.max(...dates.map((date) => new Date(date).getTime())))
  })

  eleventyConfig.addFilter('newest_update', (posts) =>
    new Date(Math.max(...(posts || []).map((post) => new Date(post.data.updated ? parseDate(post.data.updated) : post.date).getTime())))
  )

  eleventyConfig.addFilter('about_faq', (projects, site) => aboutFaq(projects, site))
  eleventyConfig.addGlobalData('definitions', definitions)

  eleventyConfig.addFilter('structured_data', function (ogImage) {
    const ctx = this.ctx
    return structuredData({ site: ctx.site, page: ctx.page, data: ctx, ogImage })
  })

  eleventyConfig.addTransform('tweet-align', function (content) {
    if (!(this.page.outputPath || '').endsWith('.html')) return content
    return content.replace(/<blockquote class="twitter-tweet"(?![^>]*data-align)/g, '<blockquote class="twitter-tweet" data-align="center"')
  })

  eleventyConfig.setLibrary('md', markdown)

  // Filters
  eleventyConfig.addFilter('markdownify', (str) => markdown.render(str))

  eleventyConfig.addFilter('markdownify_inline', (str) =>
    markdown.renderInline(str)
  )

  eleventyConfig.addFilter('link_icons', (html, icons) =>
    String(html).replace(/<a href="([^"]+)">/g, (tag, href) => {
      const all = icons || {}
      const key = Object.keys(all).find((k) => k === href || (k.endsWith('/') && href.startsWith(k)))
      const icon = key && all[key]
      return icon ? `${tag}<img src="${icon.src}" alt="" width="${icon.width}" height="${icon.height}" eleventy:widths="32,64" sizes="1em">` : tag
    })
  )

  eleventyConfig.addFilter('strip_html', (str) => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ''
    )
  })

  eleventyConfig.addFilter('html_date_string', (dateObj) => {
    return DateTime.fromJSDate(parseDate(dateObj), {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('date_formatted', (obj) => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat('LLL dd yyyy')
  })

  eleventyConfig.addFilter('date_month_year', (obj) => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat('LLL yyyy')
  })

  eleventyConfig.addFilter('permalink', (str) => {
    return str.replace(/\.html/g, '')
  })

  eleventyConfig.addFilter('pick_projects', (projects, fullNames) => {
    const wanted = new Set((fullNames || []).map((name) => name.toLowerCase()))
    const picked = (projects || []).filter((project) => wanted.has(project.fullName.toLowerCase()))
    if (picked.length < wanted.size) {
      const found = new Set(picked.map((project) => project.fullName.toLowerCase()))
      const missing = [...wanted].filter((name) => !found.has(name))
      console.warn(`[projects] homeProjects not in the project list: ${missing.join(', ')}`)
    }
    return picked
  })

  eleventyConfig.addFilter('thousands', (value) =>
    new Intl.NumberFormat('en-US').format(value)
  )

  eleventyConfig.addFilter('project_stats', (projects, site) => projectStats(projects, site))

  eleventyConfig.addFilter('project_by', (projects, fullName) =>
    (projects || []).find((project) => project.fullName.toLowerCase() === String(fullName).toLowerCase())
  )

  eleventyConfig.addFilter('related_posts', (posts, url, tags, n = 3) => {
    const own = new Set((tags || []).filter((tag) => tag !== 'posts'))
    const others = (posts || []).filter((post) => post.url !== url)
    const scored = others
      .map((post, index) => ({ post, index, shared: (post.data.tags || []).filter((tag) => own.has(tag)).length }))
      .sort((a, b) => b.shared - a.shared || a.index - b.index)
    return scored.slice(0, n).map((entry) => entry.post)
  })

  eleventyConfig.addFilter('with_substack', (posts, substackItems) => {
    const mirrored = new Set((posts || []).map((post) => post.data.substackUrl).filter(Boolean))
    const siteTitles = new Set((posts || []).map((post) => String(post.data.title).toLowerCase()))
    const external = (substackItems || [])
      .filter((item) => !mirrored.has(item.url) && !siteTitles.has(item.title.toLowerCase()))
      .map((item) => ({ url: item.url, date: item.date, data: { title: item.title }, external: true }))
    return [...(posts || []), ...external].sort((a, b) => b.date - a.date)
  })

  // Collections
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse()
  })

  eleventyConfig.addCollection('latestPosts', (collection) => {
    return collection.getFilteredByGlob('**/posts/*.md').slice(-10).reverse()
  })

  // Shortcodes
  eleventyConfig.addShortcode('Figure', Figure)
  eleventyConfig.addShortcode('GenerateRobotsTXTRules', GenerateRobotsTXTRules)

  // Copy all content we want published
  // that are not part of the build process
  eleventyConfig
    .addPassthroughCopy('src/static')
    .addPassthroughCopy('src/keybase.txt')
    .addPassthroughCopy('src/crossdomain.xml')
    .addPassthroughCopy({
      'node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2': 'static/fonts/manrope-latin-500-normal.woff2',
      'node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2': 'static/fonts/manrope-latin-700-normal.woff2',
      'node_modules/@fontsource/manrope/LICENSE': 'static/fonts/manrope-LICENSE.txt'
    })

  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
