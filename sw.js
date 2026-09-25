// Nome della cache: quando modifichi l'app cambia v1 in v2, v3...
const CACHE_NAME = "shopping-list-v2"

// I file da salvare per poter usare l'app senza connessione
const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./index.js",
    "./site.webmanifest",
    "./favicon.ico",
    "./favicon-16x16.png",
    "./favicon-32x32.png",
    "./apple-touch-icon.png",
    "./android-chrome-192x192.png",
    "./android-chrome-512x512.png"
]

// 1. INSTALL: parte la prima volta e salva tutti i file nella cache
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES)
        })
    )
})

// 2. ACTIVATE: cancella le cache vecchie (es. v1 quando passi a v2)
self.addEventListener("activate", function(e) {
    e.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.map(function(name) {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name)
                    }
                })
            )
        })
    )
})

// 3. FETCH: parte ogni volta che la pagina chiede un file
self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches.match(e.request).then(function(fileInCache) {
            // se il file è nella cache lo uso, altrimenti lo scarico da internet
            return fileInCache || fetch(e.request)
        })
    )
})
