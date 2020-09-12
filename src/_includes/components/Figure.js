module.exports = ({ src, alt = '', caption = '' }) => `
  <figure>
    <div>
      <img src="${src}" alt="${alt}" />
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
