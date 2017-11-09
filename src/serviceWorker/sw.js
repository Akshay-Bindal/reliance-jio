/**
 * Created by akshaybindal on 09/11/17.
 */

/* eslint-disable no-console, max-len */
// update this version whenever service worker or config changes
const version = 'v6';
// The name of the cache
const cacheName = `sw-${version}`;

const staticAssetRegex =
  /(^(https?:\/\/)(.*\/mbassets\/|assetscdn1?\.com|shop\.com|cdn\.trackjs\.com).*\.(js|css|png|svg|ttf|woff2?|jpe?g))|(^https?:\/\/fonts\.(googleapis|gstatic)\.com\/.*)/i;

const regexToExclude =
  /^(https?:\/\/).*\/r?travel\/.*\.(js|css|png|svg|ttf|jpe?g)/i;

const urisToExclude =
  /^(https?:\/\/).*\/(flights|hotels|bus-tickets|train-tickets|digitalcredit).*$/i;

const flyoutsRegex = /^(https?:\/\/).*mobile\/flyouts.*/i;

const catalogRegex = /^https?:\/\/catalog(-staging)?\.com\/.*/;

const utilitiesCacheName = /^Utilities-v[0-9]{0,}/;

// Install the Service Worker
self.addEventListener('install', () => {
  console.log('[service-worker] Installing .. ');
  self.skipWaiting();
});

// Install the Service Worker
self.addEventListener('activate', (e) => {
  console.log('[service-worker] Activating...');
  self.clients.claim();
  e.waitUntil(
    caches.keys().then((existingCaches) => {
      return Promise.all(
        existingCaches.map((existingCacheName) => {
          if (utilitiesCacheName.test(existingCacheName) && existingCacheName.indexOf(cacheName) === -1) {
            console.log('%c DELETE: Out of date cache: %s', 'color: #ff0000', existingCacheName);
            caches.delete(existingCacheName);
          }
          return false;
        })
      );
    })
  );
});

//generic fetch call with saving in cache
const fetchWithSave = (cache, request) => {
  return new Promise((resolve, reject) => {
    fetch(request).then(response => {
      console.log('putting in cache and serving the response');
      cache.put(request, response.clone());
      resolve(response);
    }).catch(error => {
      console.error('Fetching failed:', error);
      reject(error);
    });
  });
};

// This place is where we write the different strategies
// incorporated by us for serving the response as well as caching it.

// cache with a fallback of network : mainly for static files whose names are unique
const cacheWithNWFallback = (cacheName, request, alwaysNet) => {
  return new Promise((resolve, reject) => {
    caches.open(cacheName).then(cache => {
      return cache.match(request).then(response => {
        if (response) {
          alwaysNet && fetchWithSave(cache, request);
          console.log(`serving response from cache ${cacheName}`, response);
          return resolve(response);
        }
        return resolve(fetchWithSave(cache, request));
      }).catch((e) => {
        console.log('Cache open error occured', request.url);
        reject(e);
      });
    });
  });
};

// fetch data using service worker
self.addEventListener('fetch', (event) => {
  // 3 cases
  // case 1 : js, css, images
  if (staticAssetRegex.test(event.request.url) && !regexToExclude.test(event.request.url)) {
    event.respondWith(cacheWithNWFallback(cacheName, event.request));
  } else if ((event.request.mode === 'navigate' && !urisToExclude.test(event.request.url))
    || flyoutsRegex.test(event.request.url)) { // case 2 : html
    event.respondWith(cacheWithNWFallback(cacheName, event.request, true));
  } else if (catalogRegex.test(event.request.url) && !regexToExclude.test(event.request.url)) {
    event.respondWith(cacheWithNWFallback(cacheName, event.request, true));
  }
});
