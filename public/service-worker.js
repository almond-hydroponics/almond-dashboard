/* eslint-disable no-undef */

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// precacheAndRoute(self.__WB_MANIFEST);

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
	'.',
	'index.html',
	'./offline.html',
	'./images/offline.png',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://res.cloudinary.com/almondgreen/raw/upload/v1569408169/Almond/styles/globals_h6bbjb.css',
	'https://res.cloudinary.com/almondgreen/raw/upload/v1569408967/Almond/styles/fonts_pbjkao.css',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[ServiceWorker] Pre-caching offline page');
			return cache.addAll(FILES_TO_CACHE);
		}),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				}),
			);
		}),
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.mode !== 'navigate') {
		// Not a page navigation, bail.
		return;
	}
	if (event.request.url.includes('/api/')) {
		console.log('[Service Worker] Fetch (data)', event.request.url);
		event.respondWith(
			caches.open(DATA_CACHE_NAME).then((cache) => {
				return fetch(event.request)
					.then((response) => {
						// If the response was good, clone it and store it in the cache.
						if (response.status === 200) {
							cache.put(event.request.url, response.clone());
						}
						return response;
					})
					.catch((err) => {
						// Network request failed, try to get it from the cache.
						return cache.match(event.request);
					});
			}),
		);
		return;
	}
	event.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(event.request).then((response) => {
				return response || fetch(event.request);
			});
		}),
	);
});

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
//
//   workbox.precaching.precacheAndRoute(self.__precacheManifest);
//   // precacheAndRoute(self.__WB_MANIFEST);
//
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
