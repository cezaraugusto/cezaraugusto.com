module.exports = ({ src, alt = '', caption = '' }) => `
  <figure>
    <img class="portrait" src="${src}" alt="${alt}" />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
