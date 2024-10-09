const CACHE_NAME = 'niseamen-cache-v1';
const urlsToCache = [
    '/',
    './index.html',
    './styles/style.css',
    './styles/style.css.map',
    './styles/style.scss',
    './script.js',
    './images/logo.png',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/maskable_icon_x192.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/maskable_icon_x512.png',
    './icons/icon-512x512.png'
    // Add other URLs you want to cache as needed
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME]; // Use the CACHE_NAME constant
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function(networkResponse) {
                // Only cache valid responses
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                var responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            });
        })
    );
});