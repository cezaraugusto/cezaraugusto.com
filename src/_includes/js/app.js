;(() => {
  const videos = document.querySelectorAll('video[autoplay]')
  if (!videos.length) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const apply = () => videos.forEach((video) => {
    if (reduce.matches) {
      video.removeAttribute('autoplay')
      video.pause()
      video.load()
    } else if (video.paused) {
      video.play().catch(() => {})
    }
  })
  apply()
  reduce.addEventListener('change', apply)
})()
