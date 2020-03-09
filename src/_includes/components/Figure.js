module.exports = ({ src, alt = '', caption = '', photo = false }) => `
  <figure class="${photo && 'picture-filter'}">
    <img class="portrait" src="${src}" alt="${alt}" />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
