// Service Worker for NaturalCare Website
// Provides offline functionality and caching

const CACHE_NAME = 'naturalcare-v1.0.0';
const STATIC_CACHE = 'naturalcare-static-v1';
const DYNAMIC_CACHE = 'naturalcare-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/translations.js',
    '/firebase-config.js',
    '/manifest.json',
    '/favicon.ico',
    
    // External CDN resources (fallbacks)
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
    '/api/',
    'https://firestore.googleapis.com/',
    'https://firebase.googleapis.com/',
    'https://wa.me/',
    'https://formspree.io/'
];

// Cache-first resources (images, etc.)
const CACHE_FIRST = [
    'https://images.unsplash.com/',
    '/icons/',
    '/images/'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
    const requestUrl = event.request.url;
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (requestUrl.startsWith('chrome-extension://')) {
        return;
    }
    
    // Handle different caching strategies based on request
    if (isNetworkFirst(requestUrl)) {
        event.respondWith(networkFirst(event.request));
    } else if (isCacheFirst(requestUrl)) {
        event.respondWith(cacheFirst(event.request));
    } else {
        event.respondWith(staleWhileRevalidate(event.request));
    }
});

// Network-first strategy
function networkFirst(request) {
    return fetch(request)
        .then((response) => {
            // Clone response for caching
            const responseToCache = response.clone();
            
            // Cache successful responses
            if (response.status === 200) {
                caches.open(DYNAMIC_CACHE)
                    .then((cache) => {
                        cache.put(request, responseToCache);
                    });
            }
            
            return response;
        })
        .catch(() => {
            // Fallback to cache if network fails
            return caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // Return offline page for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/');
                    }
                    
                    // Return empty response for other requests
                    return new Response('Offline', {
                        status: 408,
                        statusText: 'Offline'
                    });
                });
        });
}

// Cache-first strategy
function cacheFirst(request) {
    return caches.match(request)
        .then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // If not in cache, fetch from network
            return fetch(request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                    }
                    
                    return response;
                })
                .catch(() => {
                    // Return placeholder for failed image requests
                    if (request.destination === 'image') {
                        return new Response(
                            '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="#999">Image unavailable</text></svg>',
                            {
                                headers: {
                                    'Content-Type': 'image/svg+xml'
                                }
                            }
                        );
                    }
                    
                    return new Response('Resource unavailable offline', {
                        status: 408,
                        statusText: 'Offline'
                    });
                });
        });
}

// Stale-while-revalidate strategy
function staleWhileRevalidate(request) {
    return caches.match(request)
        .then((cachedResponse) => {
            // Fetch fresh version in background
            const fetchPromise = fetch(request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    // Return cached version on network error
                    return cachedResponse;
                });
            
            // Return cached version immediately if available
            return cachedResponse || fetchPromise;
        });
}

// Helper functions to determine caching strategy
function isNetworkFirst(url) {
    return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

function isCacheFirst(url) {
    return CACHE_FIRST.some(pattern => url.includes(pattern));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

// Sync offline form submissions
function syncContactForm() {
    return new Promise((resolve, reject) => {
        // Get stored form data from IndexedDB or localStorage
        // This would need to be implemented in the main script
        console.log('Service Worker: Syncing contact form submissions');
        resolve();
    });
}

// Push notification handling
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received', event);
    
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'New update from NaturalCare',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            vibrate: [200, 100, 200],
            data: data.data || {},
            actions: [
                {
                    action: 'view',
                    title: 'View',
                    icon: '/icons/action-view.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/icons/action-close.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'NaturalCare', options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked', event);
    
    event.notification.close();
    
    if (event.action === 'view') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
            case 'CACHE_URLS':
                event.waitUntil(
                    caches.open(DYNAMIC_CACHE)
                        .then((cache) => {
                            return cache.addAll(event.data.urls);
                        })
                );
                break;
            case 'CLEAR_CACHE':
                event.waitUntil(
                    caches.keys()
                        .then((cacheNames) => {
                            return Promise.all(
                                cacheNames.map((cacheName) => {
                                    return caches.delete(cacheName);
                                })
                            );
                        })
                );
                break;
        }
    }
});

// Periodic background sync (experimental)
self.addEventListener('periodicsync', (event) => {
    console.log('Service Worker: Periodic sync triggered', event.tag);
    
    if (event.tag === 'update-products') {
        event.waitUntil(updateProductsCache());
    }
});

function updateProductsCache() {
    return fetch('/api/products')
        .then((response) => response.json())
        .then((products) => {
            // Update cached product data
            return caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                    return cache.put('/api/products', new Response(JSON.stringify(products)));
                });
        })
        .catch((error) => {
            console.error('Service Worker: Error updating products cache', error);
        });
}

// Error handling
self.addEventListener('error', (event) => {
    console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
});

// Cache management utilities
function cleanupOldCaches() {
    const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
    
    return caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!currentCaches.includes(cacheName)) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        '/',
        '/styles.css',
        '/script.js'
    ];
    
    return caches.open(STATIC_CACHE)
        .then((cache) => {
            return cache.addAll(criticalResources);
        });
}

console.log('Service Worker: Script loaded successfully');