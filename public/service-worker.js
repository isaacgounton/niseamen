// service-worker.js
const CACHE_VERSION = 'v2'; // Increment this when you want to force an update
const CACHE_NAME = `niseamen-cache-${CACHE_VERSION}`;
const urlsToCache = [
    '/',
    './index.html',
    './style.css',
    './img/CantiqueECC.webp',
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
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('niseamen-cache-') && cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    let requestURL = new URL(event.request.url);

    // Only cache HTTP/HTTPS requests
    if (requestURL.protocol === 'http:' || requestURL.protocol === 'https:') {
        if (requestURL.pathname === '/') {
            event.respondWith(caches.match('./index.html').then(function(response) {
                return response || fetch('./index.html');
            }));
        } else {
            event.respondWith(
                caches.match(event.request).then(function(response) {
                    return response || fetch(event.request).then(function(networkResponse) {
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
        }
    }
});

// Force the waiting service worker to become the active service worker
self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});