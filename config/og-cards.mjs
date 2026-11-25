import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import Image from '@11ty/eleventy-img'

const WIDTH = 1200
const HEIGHT = 630
const URL_PATH = '/static/og/'

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const wrap = (text, maxChars, maxLines) => {
  const lines = []
  let line = ''
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\s*\S*$/, '') + '…'
    return kept
  }
  return lines
}

const slugFor = (url) => (url === '/' ? 'home' : url.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase())

export function createOgCards ({ avatarPath, siteHost }) {
  const jobs = new Map()
  const avatar = `data:image/png;base64,${fs.readFileSync(avatarPath).toString('base64')}`

  const svgFor = ({ title, kicker }) => {
    const fontSize = title.length > 60 ? 64 : 76
    const lines = wrap(title, fontSize === 64 ? 30 : 26, 4)
    const lineHeight = Math.round(fontSize * 1.15)
    const top = 300 - ((lines.length - 1) * lineHeight) / 2
    const font = 'Manrope, Helvetica Neue, Helvetica, Arial, sans-serif'
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#f9f9f9"/>
  <rect x="0" y="0" width="${WIDTH}" height="14" fill="#222222"/>
  <text x="80" y="140" font-family="${font}" font-size="30" font-weight="700" fill="#4a4a4a">${escapeXml(kicker)}</text>
  ${lines.map((line, i) => `<text x="80" y="${top + i * lineHeight}" font-family="${font}" font-size="${fontSize}" font-weight="700" fill="#222222">${escapeXml(line)}</text>`).join('\n  ')}
  <clipPath id="avatar"><circle cx="128" cy="526" r="48"/></clipPath>
  <image href="${avatar}" x="80" y="478" width="96" height="96" clip-path="url(#avatar)"/>
  <text x="200" y="518" font-family="${font}" font-size="32" font-weight="700" fill="#222222">Cezar Augusto</text>
  <text x="200" y="560" font-family="${font}" font-size="28" fill="#4a4a4a">${escapeXml(siteHost)}</text>
</svg>`
  }

  const register = (url, title, kicker) => {
    const job = { title: String(title || 'Cezar Augusto'), kicker: String(kicker || '') }
    const hash = crypto.createHash('sha256').update(svgFor(job)).digest('hex').slice(0, 10)
    const name = `${slugFor(url)}-${hash}`
    jobs.set(name, job)
    return `${URL_PATH}${name}.png`
  }

  const render = async (outputDir) => {
    const dir = path.join(outputDir, URL_PATH)
    await Promise.all(
      [...jobs].map(([name, job]) =>
        Image(Buffer.from(svgFor(job)), {
          widths: [WIDTH],
          formats: ['png'],
          sharpPngOptions: { palette: true, quality: 90, effort: 10, compressionLevel: 9 },
          outputDir: dir,
          urlPath: URL_PATH,
          filenameFormat: () => `${name}.png`
        })
      )
    )
  }

  return { register, render, reset: () => jobs.clear(), width: WIDTH, height: HEIGHT }
}

const MIN_WIDTH = 1200
const MIN_HEIGHT = 630
const MIN_RATIO = 1.5
const MAX_RATIO = 2.1
const MAX_BYTES = 5 * 1024 * 1024

const readDimensions = (buffer) => {
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { type: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }
  if (buffer.length > 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buffer.toString('ascii', 12, 16)
    if (chunk === 'VP8X') return { type: 'image/webp', width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) }
    if (chunk === 'VP8L') {
      const bits = buffer.readUInt32LE(21)
      return { type: 'image/webp', width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
    }
    if (chunk === 'VP8 ') return { type: 'image/webp', width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff }
  }
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buffer.length && buffer[offset] === 0xff) {
      const marker = buffer[offset + 1]
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { type: 'image/jpeg', width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) }
      }
      offset += 2 + buffer.readUInt16BE(offset + 2)
    }
  }
  return null
}

export function shareImageFor (src, inputDir) {
  if (!src || /^[a-z]+:/i.test(src)) return null
  const file = path.join(inputDir, src)
  if (!fs.existsSync(file)) return null
  const buffer = fs.readFileSync(file)
  const size = readDimensions(buffer)
  if (!size || buffer.length > MAX_BYTES) return null
  const ratio = size.width / size.height
  if (size.width < MIN_WIDTH || size.height < MIN_HEIGHT || ratio < MIN_RATIO || ratio > MAX_RATIO) return null
  return { url: src, ...size }
}
