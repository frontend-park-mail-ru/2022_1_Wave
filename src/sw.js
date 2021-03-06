const cachedUrl = [];

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
const tracksRegex = /^(.*)\/assets\/track(.*)$/;
const imagesRegex = /^(.*)\/images\/(.*)$/;
const staticHtml = /\/$/;
const staticJS = /.js$/;
const staticCSS = /.css$/;
const fonts = /(.ttf|.woff2)$/;

const regexes = [apiRegex, assetsRegex, staticHtml, imagesRegex, staticJS, staticCSS, fonts];

this.addEventListener('activate', (_event) => {
  console.log('Claiming control');
  return this.clients.claim();
});

const needCache = (url) => regexes.reduce((accum, regex) => regex.test(url) || accum, false);

this.addEventListener('fetch', (event) => {
  // Кешируем только GET запросы, удовлетворяющие условию
  // иначе выполняем исходный запрос
  if (event.request.method !== 'GET' || !needCache(event.request.url)) {
    return;
  }
  // Отдельно работаем с треками
  if (navigator.onLine && tracksRegex.test(event.request.url)) {
    caches.open(cacheName)
      .then(
        cache => cache.add(event.request.url)
      );
    return;
  }
  // Останавливаем исходный запрос
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(event.request);

    // Если что-то закэшировалось, то мы отдаем это в двух случаях:
    // - это не апи конец
    // - нет сетевого соединения
    const isAPIRequest = apiRegex.test(event.request.url);
    if ((!isAPIRequest || !navigator.onLine) && cached) {
      // обновляем кэш в фоне
      if (navigator.onLine) {
        event.waitUntil(cache.add(event.request));
      }

      console.log('cached:', cached);

      return cached;
    }

    // Ничего не закэшировалось - делаем исходный запрос
    const response = await fetch(event.request);

    // Если запрос успешно прошел и он same origin - кэшируем его
    if (response?.ok && response?.status !== 206) {
      await cache.put(event.request, response.clone());
    }

    return response
  })());
});
