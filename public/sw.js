
// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = 'pwa-app-cache';
const cacheAssets = [
  'index.html'
];
const CACHE_VERSION = 1;
let CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION
};
const OFFLINE_URL = 'index.html';
function createCacheBustedRequest(url) {
  let request = new Request(url, {cache: 'reload'});
  // See https://fetch.spec.whatwg.org/#concept-request-mode
  // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
  // if the cache: 'reload' option had any effect.
  if ('cache' in request) {
    return request;
  }

  // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}
// Delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(key);
          }
        }))
      )
  );
});
self.addEventListener('install', event => {
  event.waitUntil(
    // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
    // the actual URL we end up requesting might include a cache-busting parameter.
    fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(response) {
      return caches.open(CURRENT_CACHES.offline).then(function(cache) {
        return cache.put(OFFLINE_URL, response);
      });
    })
  );
});

// This triggers when user starts the app
// self.addEventListener('install', (event) => {
//   console.log("service worker installed .....");
//     event.waitUntil(
//       caches.open(CACHE_NAME)
//         .then(cache => {
//           console.log("Service Worker : Caching Files");
//           // fetch('manifest.webmanifest')
//           //   .then(response => {
//           //     response.json();
//           //   })
//           //   .then(assets => {
//           //     // We will cache initial page and the main.js
//           //     // We could also cache assets like CSS and images
//           //     const urlsToCache = [
//           //       '/',
//           //       assets['index.js']
//           //     ];
//               cache.addAll(cacheAssets);
//             })
//             .then(() => self.skipWaiting())
        
//     );
  
// });
// // Here we intercept request and serve up the matching files
// self.addEventListener('fetch', (event) => {
//   console.log("Service Worker : fetching")
//     event.respondWith(
//       // caches.match(event.request).then(function(response) {
//       //   return response || fetch(event.request);
//       // })
//       fetch(event.request).catch(()=> caches.match())
//     );
// });
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
       event.request.headers.get('accept').includes('text/html'))) {
    console.log('Handling fetch event for', event.request.url);
    event.respondWith(
      fetch(event.request).catch(error => {
        console.log('Fetch failed; returning offline page instead.', error);
        return caches.match(OFFLINE_URL);
      })
    );
  }
// //offline mode
// addEventListener('fetch', event => {
//   var reqDate = reqDate || Date.now()
//   event.respondWith(async function() {
//     if (reqDate < reqDate-300000) return fetch(evetn.request);
//     // else return fetch(event.request);
//   }());
// });