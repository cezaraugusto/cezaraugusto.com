import EleventyFetch from '@11ty/eleventy-fetch'
import { XMLParser } from 'fast-xml-parser'

const FEED = 'https://cezaraugusto.substack.com/feed'

export default async function () {
  try {
    const xml = await EleventyFetch(FEED, { duration: '1d', type: 'text' })
    const parser = new XMLParser({ ignoreAttributes: true, cdataPropName: false })
    const channel = parser.parse(xml)?.rss?.channel
    const items = [].concat(channel?.item || [])
    return items
      .map((item) => ({
        title: String(item.title || '').trim(),
        url: String(item.link || '').trim(),
        description: String(item.description || '').trim(),
        date: new Date(item.pubDate)
      }))
      .filter((item) => item.title && item.url.startsWith('https://') && !Number.isNaN(item.date.getTime()))
  } catch (error) {
    console.warn(`[substack] feed unavailable, listing site posts only: ${error.message}`)
    return []
  }
}
