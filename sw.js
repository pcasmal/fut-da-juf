// Fut da JUF — service worker
// Estratégia: network-first com fallback para cache. Assim o app funciona
// offline (útil na quadra) mas sempre pega a versão mais nova quando há internet.
// Ao publicar uma atualização, troque o número da versão abaixo (ex.: v2, v3...).
const CACHE = 'futdajuf-v36';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
