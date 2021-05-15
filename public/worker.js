const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// var CACHE_NAME = 'pwa-task-manager';
// var urlsToCache = ['/', '/completed'];

// // Install a service worker
// self.addEventListener('install', (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log('Opened cache');
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Cache and return requests
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// self.addEventListener('activate', (event) => {
//   var cacheWhitelist = ['pwa-task-manager'];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
// );

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);

//   workbox.precaching.precacheAndRoute([]);
//   workbox.skipWaiting();
//   workbox.clientsClaim();

//   workbox.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|svg)$/,
//     workbox.strategies.cacheFirst({
//       cacheName: 'images',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 60,
//           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//         }),
//       ],
//     })
//   );
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
