importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js') // synchronous; doesn't need to be at the top

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉", workbox)
  console.log("strategies", workbox.strategies)

  workbox.core.setCacheNameDetails({
    prefix: 'my-sw-app',
    suffix: 'v1',
    precache: 'custom-precache-name',
    runtime: 'custom-runtime-name'
  })

  // https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.html
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst({
      cacheName: 'js-cache'
    })
  )
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache'
    })
  )

  workbox.precaching.precacheAndRoute([
    // '/styles/index.0c9a31.css',
    // '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
  ])
  
} else {
  console.log("Boo! Workbox didn't load 😬")
}

self.addEventListener('install', () => {
  console.log("installing....")
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log("activating.....")
})


/*

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

*/