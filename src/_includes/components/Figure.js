module.exports = ({ src, alt = '', caption = '' }) => `
  <figure>
    <div>
      <img class="m-auto" src="${src}" alt="${alt}" />
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
