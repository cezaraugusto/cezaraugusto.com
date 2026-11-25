import fs from 'node:fs'
import path from 'node:path'
import Image from '@11ty/eleventy-img'

const MASTER = 512
const BACKGROUND = '#f9f9f9'
const ICON_PATH = '/static/icons/'

const svgFor = (avatar, shape) => {
  const image = (x, y, size, clip = '') => `<image href="${avatar}" x="${x}" y="${y}" width="${size}" height="${size}"${clip}/>`
  const body = {
    round: `<clipPath id="c"><circle cx="256" cy="256" r="256"/></clipPath>${image(0, 0, MASTER, ' clip-path="url(#c)"')}`,
    square: `<rect width="100%" height="100%" fill="#ffffff"/>${image(0, 0, MASTER)}`,
    maskable: `<rect width="100%" height="100%" fill="#ffffff"/>${image(36, 72, 440)}`
  }[shape]
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${MASTER}" height="${MASTER}" viewBox="0 0 ${MASTER} ${MASTER}">${body}</svg>`)
}

const opaque = (sharp) => sharp.flatten({ background: '#ffffff' })

const renderPng = async (svg, width, transform) => {
  const stats = await Image(svg, {
    widths: [width],
    formats: ['png'],
    sharpPngOptions: { palette: true, quality: 90, effort: 10, compressionLevel: 9 },
    dryRun: true,
    ...(transform ? { transform } : {})
  })
  return stats.png[0].buffer
}

const toIco = (images) => {
  const header = Buffer.alloc(6 + images.length * 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, buffer }, i) => {
    const entry = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, entry)
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1)
    header.writeUInt8(0, entry + 2)
    header.writeUInt8(0, entry + 3)
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(buffer.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += buffer.length
  })
  return Buffer.concat([header, ...images.map(({ buffer }) => buffer)])
}

export function createSiteIcons ({ avatarPath, name, description }) {
  const avatar = `data:image/png;base64,${fs.readFileSync(avatarPath).toString('base64')}`
  const round = svgFor(avatar, 'round')
  const square = svgFor(avatar, 'square')
  const maskable = svgFor(avatar, 'maskable')

  const files = [
    { url: '/apple-touch-icon.png', svg: square, size: 180, transform: opaque },
    { url: `${ICON_PATH}favicon-16.png`, svg: round, size: 16 },
    { url: `${ICON_PATH}favicon-32.png`, svg: round, size: 32 },
    { url: `${ICON_PATH}icon-192.png`, svg: square, size: 192, transform: opaque },
    { url: `${ICON_PATH}icon-512.png`, svg: square, size: 512, transform: opaque },
    { url: `${ICON_PATH}icon-maskable-512.png`, svg: maskable, size: 512, transform: opaque }
  ]

  const manifest = {
    id: '/',
    name,
    short_name: name,
    description,
    lang: 'en-US',
    start_url: '/',
    scope: '/',
    display: 'browser',
    theme_color: BACKGROUND,
    background_color: BACKGROUND,
    icons: [
      { src: `${ICON_PATH}icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${ICON_PATH}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${ICON_PATH}icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  }

  const write = (outputDir, url, contents) => {
    const file = path.join(outputDir, url)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, contents)
  }

  const render = async (outputDir) => {
    await Promise.all(files.map(async ({ url, svg, size, transform }) => write(outputDir, url, await renderPng(svg, size, transform))))
    const ico = await Promise.all([16, 32, 48].map(async (size) => ({ size, buffer: await renderPng(round, size) })))
    write(outputDir, '/favicon.ico', toIco(ico))
    write(outputDir, '/site.webmanifest', JSON.stringify(manifest, null, 2) + '\n')
  }

  return { render }
}
