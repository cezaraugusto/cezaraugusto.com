const {DateTime} = require('luxon')
const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-es')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const Figure = require('../src/_includes/components/Figure.js')
const Youtube = require('../src/_includes/components/Youtube.js')
const FluidText = require('../src/_includes/components/FluidText.js')
const GenerateRobotsTXTRules = require('../src/_includes/components/GenerateRobotsTXTRules.js')
const anchor = require('markdown-it-anchor')
const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
const markdown = md.use(anchor, {
  level: [2],
  permalink: anchor.permalink.headerLink({safariReaderFix: true}),
  permalinkBefore: true,
  permalinkSymbol: ''
})

module.exports = (eleventyConfig) => {
  const parseDate = (str) => {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, {zone: 'utc'})
    return date.toJSDate()
  }

  // Plugins
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.setLibrary('md', markdown)

  // Filters
  eleventyConfig.addFilter(
    'cssmin',
    (code) => new CleanCSS({}).minify(code).styles
  )

  eleventyConfig.addFilter('jsmin', (code) => {
    const minified = UglifyJS.minify(code)
    if (minified.error) {
      console.error('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  })

  eleventyConfig.addFilter('markdownify', (str) => markdown.render(str))

  eleventyConfig.addFilter('markdownify_inline', (str) =>
    markdown.renderInline(str)
  )

  eleventyConfig.addFilter('strip_html', (str) => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ''
    )
  })

  eleventyConfig.addFilter('html_date_string', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('date_to_permalink', (obj) => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM')
  })

  eleventyConfig.addFilter('date_formatted', (obj) => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('LLL dd yyyy')
  })

  eleventyConfig.addFilter('permalink', (str) => {
    return str.replace(/\.html/g, '')
  })

  eleventyConfig.addFilter('space_safe', (str) => {
    return str.replace(/\s+/g, '%20')
  })

  // Collections
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse()
  })

  eleventyConfig.addCollection('latestPosts', (collection) => {
    return collection.getFilteredByGlob('**/posts/*.md').slice(-5).reverse()
  })

  // Shortcodes
  eleventyConfig.addShortcode('Figure', Figure)
  eleventyConfig.addShortcode('Youtube', Youtube)
  eleventyConfig.addShortcode('FluidText', FluidText)
  eleventyConfig.addShortcode('GenerateRobotsTXTRules', GenerateRobotsTXTRules)

  // Copy all content we want published
  // that are not part of the build process
  const generateRobotsTXTFile =
    process.env.NODE_ENV === 'staging'
      ? 'src/robots_staging.txt'
      : 'src/robots_production.txt'

  eleventyConfig
    .addPassthroughCopy('src/static')
    .addPassthroughCopy({[generateRobotsTXTFile]: 'robots.txt'})
    .addPassthroughCopy('src/keybase.txt')
    .addPassthroughCopy('src/crossdomain.xml')

  eleventyConfig.addWatchTarget('src/**/*.css')

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
