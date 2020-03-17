module.exports = ({ src, alt = '', caption = '' }) => `
  <figure>
    <div class="image--filter">
      <img src="${src}" alt="${alt}" />
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
