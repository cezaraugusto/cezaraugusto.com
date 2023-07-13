

!function(){const e=["/assets/images/fallback-img.png","/assets/css/prism.css","/assets/js/twitter-widget.js"];self.addEventListener("install",s=>{caches&&s.waitUntil(caches.open("cezaraugustonet1.2.0").then(s=>s.addAll(e)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(s=>s||fetch(e.request)))}),self.addEventListener("activate",e=>{const s=["cezaraugustonet1.2.0"];e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>s.includes(e)?e:caches.delete(e)))))}),self.addEventListener("message",e=>{"skipWaiting"===e.data&&self.skipWaiting()})}();
