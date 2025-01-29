module.exports = () =>
  process.env.NODE_ENV === 'staging' ? 'noindex, nofollow' : 'index, follow'
