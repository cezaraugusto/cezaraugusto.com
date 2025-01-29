module.exports = ({min = 0, scaler = 0, max = 0, text = ''}) => `
  <div
    class="fluid-text"
    style="font-size: clamp(${min}, ${scaler}, ${max}"
  >
    ${text}
  </div>
`
