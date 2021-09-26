/* global self, caches, fetch */
(function () {
  const identityName = 'cezaraugustonet'
  const identityVersion = '1.2.0'
  const identityCache = identityName + identityVersion

  const identityFiles = [
    '/assets/images/fallback-img.png',
    '/assets/css/prism.css',
    // Cache twitter widget
    '/assets/js/twitter-widget.js'
  ]

  // install cacheable resources
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(identityCache).then(cache => cache.addAll(identityFiles))
    )
  })

  // cumulatively cache new requests by handling the response
  // of the fetch request and adding it to the cache
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        // if there are cached content already, return them
        if (response) {
          return response
        }
        return fetch(event.request)
      })
    )
  })

  // remove all old instances of this sw if they are not in the whitelist
  self.addEventListener('activate', event => {
    const cacheWhitelist = [identityCache]
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName)
            }
          })
        )
      })
    )
  })

  self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
      self.skipWaiting()
    }
  })
})()
