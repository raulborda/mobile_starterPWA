// imports
importScripts("js/sw-db.js");
importScripts("js/sw-utils.js");

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  "/",
  "index.html",
  
];

const APP_SHELL_INMUTABLE = [
  
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener("activate", (e) => {
  const respuesta = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }

      if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
        return caches.delete(key);
      }

      if (key !== INMUTABLE_CACHE && key.includes("inmutable")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(respuesta);
});

self.addEventListener("fetch", (e) => {
  let respuesta;

  if (e.request.url.includes("/api")) {
    respuesta = manejoApiMensajes(DYNAMIC_CACHE, e.request);
  } else {
    respuesta = caches.match(e.request).then((res) => {
      if (res) {
        actualizaCacheStatico(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
        return res;
      } else {
        // console.log(e.request)
        return fetch(e.request).then((newRes) => {
          return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
        }).catch(console.log)
      }
    });
  }

  e.respondWith(respuesta);
});

self.addEventListener("sync", (e) => {
  console.log("SW: Sync");

  // normalmente voy a tratar muchos registros distintos entonces aplicaría un switch

  if (e.tag === "nuevo-post") {
    // postear a DB cuando hay conexión

    const respuesta = postearMensajes();

    e.waitUntil(respuesta);
  }
});
