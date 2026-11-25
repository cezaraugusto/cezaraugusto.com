const escapeAttribute = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

module.exports = ({src, alt = '', caption = '', width, height, loading}) => `
  <figure>
    <img src="${src}" alt="${escapeAttribute(alt)}"${width && height ? ` width="${width}" height="${height}"` : ''}${loading ? ` loading="${escapeAttribute(loading)}"` : ''}>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
