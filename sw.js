const cacheName = "kimetsu-files";
const assets = [
    "/",
    "index.html",
    "personaje.html",
    "main.js",
    "personaje.js",
    "style.css",
    "data/personaje.json",
    "data/personajes-1.json",
    "data/personajes-2.json",
    "data/personajes-3.json"
];

//ESCUCHA EL EVENTO DE INSTALACION
self.addEventListener('install', event =>{
    console.info('Se INSTALO el Service Worker!');
    event.waitUntil(
        caches
        .open(cacheName)
        .then((cache) =>
        cache.addAll(assets)));
});


//ESCUCHA EL EVENTO DE ACTIVACION
self.addEventListener('activate', event =>{
    console.info('Se ACTIVO el Service Worker')
})


//ESCUCHA EL EVENTO FETCH
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
        .match(event.request)
        .then((respuesta) => {
            if (respuesta){
                return respuesta;
            }
            let requestToCache = event.request.clone();
            return fetch(requestToCache).then((res) =>{
                if (!res || res.status !== 200){
                    return res;
                }
                let respuestaCache = res.clone();
                caches.open(cacheName).then((cache) =>{
                    cache.put(requestToCache, respuestaCache);
                });
                return res;
            });
        })
    );
});