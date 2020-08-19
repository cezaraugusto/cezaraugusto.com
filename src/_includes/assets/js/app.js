
window.addEventListener('load', () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }
})

if (document.querySelector('#copyLink')) {
  document.querySelector('#copyLink')
    .addEventListener('click', (event) => {
      event.preventDefault()
      writeToClipboard(event.target.href)
      document.querySelector('.clipboard').classList.toggle('fadeInOut')
    })
}

if (document.querySelector('#title')) {
  document.querySelector('.nav-title').innerText = document.querySelector('#title').textContent
}

function writeToClipboard (text) {
  navigator.clipboard.writeText(text)
    .then(
      () => console.log('Copied to clipboard!'),
      reason => console.error('Could not copy to clipboard:', reason)
    )
}
