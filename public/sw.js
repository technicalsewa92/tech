// Technical Sewa Service Worker
const CACHE_NAME = 'technical-sewa-v1';
const STATIC_CACHE_NAME = 'technical-sewa-static-v1';
const DYNAMIC_CACHE_NAME = 'technical-sewa-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/assets/ts-final-logo.png',
  '/assets/favlogo.png',
  '/offline.html', // We'll create this
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );

  // Skip waiting and activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith('technical-sewa-') &&
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            );
          })
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Claim clients immediately
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // If network fails, try to serve offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }

            // For images, return a placeholder
            if (request.destination === 'image') {
              return new Response(
                '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image Offline</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      handleOfflineFormSubmission()
    );
  }
});

// Push notifications (for future implementation)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body || 'Technical Sewa notification',
      icon: 'https://cdn.jsdelivr.net/gh/technicalsewa/technicalsewa@main/assets/favlogo.png',
      badge:
        'https://cdn.jsdelivr.net/gh/technicalsewa/technicalsewa@main/assets/favlogo.png',
      tag: data.tag || 'default',
      data: {
        url: data.url || '/',
      },
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'Technical Sewa',
        options
      )
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Utility function to handle offline form submissions
async function handleOfflineFormSubmission() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const requests = await cache.keys();

    // Process stored form submissions
    for (const request of requests) {
      if (request.url.includes('/api/contact') && request.method === 'POST') {
        try {
          const response = await fetch(request);
          if (response.ok) {
            await cache.delete(request);
            console.log('Service Worker: Offline form submission successful');
          }
        } catch (error) {
          console.error(
            'Service Worker: Failed to sync form submission',
            error
          );
        }
      }
    }
  } catch (error) {
    console.error(
      'Service Worker: Error handling offline form submissions',
      error
    );
  }
}
