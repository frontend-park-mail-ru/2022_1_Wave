const cachedUrl = ['/'];

const cacheName = 'waveCache';

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cachedUrl))
      .catch((err) => console.error('cannot cache', err)),
  );
});

const apiRegex = /^(.*)\/api\/(.*)/;
const assetsRegex = /^(.*)\/assets\/(.*)$/;
const imagesRegex = /^(.*)\/images\/(.*)$/;
const staticHtml = /\/$/;
const staticJS = /.js$/;
const staticCSS = /.css$/;
const fonts = /(.ttf|.woff2)$/;

const regexes = [apiRegex, assetsRegex, staticHtml, imagesRegex, staticJS, staticCSS, fonts];

this.addEventListener('activate', function (event) {
  console.log('Claiming control');
  return this.clients.claim();
});

const match = (url) => regexes.reduce((accum, regex) => regex.test(url) || accum, false);

this.addEventListener('fetch', (event) => {
  if (navigator.onLine) {
    if (event.request.method === 'GET' && match(event.request.url)) {
      caches.open(cacheName).then((cache) => {
        cache.add(event.request.url);
      });
    }
    return;
  }
  if (event.request.method === 'GET') {
    event.respondWith(caches.match(event.request).then((cachedResponse) => cachedResponse));
  }
});
