const cacheName = 'chilly_muffins'
const cacheNameFake = 'chilly_muffins_fake'
const cacheWhitelist = [cacheName]

const urlsToCache = [
  '/',
  '/styles/style.css'
  // '/scripts/app.js'
]

self.addEventListener('install', (event) => {
  console.log("installing...", event, self)
  self.skipWaiting()
  
  event.waitUntil(
      // open method available on caches, takes in the name of cache as the first paramter. It returns a promise that resolves to the instance of cache all the above URLS can be added to cache using the addAll method.
      Promise.all([
        caches.open(cacheName)
        .then (cache => {
          console.log("cache", cache)
          return cache.addAll(urlsToCache)
        }),
        caches.open(cacheNameFake)
        .then (cache => {
          // console.log("cache", cache)
          return cache.addAll(urlsToCache)
        })
      ])
  )
})

self.addEventListener('activate', (event) => {
  console.log("activating.....", event)
  event.waitUntil(
      caches.keys().then(cacheNames => {
        console.log("caches...", caches, cacheNames)
          return Promise.all(
            cacheNames.map( cacheName => {
              // Deleting all the caches except the ones that are in cacheWhitelist array
              if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName)
              }
            })
          )
      })
  )
})

self.addEventListener('fetch', function(event) {
  console.log("fetching...", event, event.request)
  event.respondWith(
    caches.open(cacheName).then(cache => cache.match(event.request)
      .then(response => {
        // Cache hit - return response
        console.log("event response", response)
        return response ? response : fetch(event.request).then(response => {
          // save valid responses to cache
          if(response && response.status === 200) {
            const responseToCache = response.clone()
            console.log("putting...", responseToCache)
            cache.put(event.request, responseToCache)
          }
          
          return response
        })
      })
      .catch(console.log)
  ))
})