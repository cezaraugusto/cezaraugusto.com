window.addEventListener('load', () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }
})
