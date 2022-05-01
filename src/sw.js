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
  // Кешируем только GET запросы, удовлетворяющие условию
  // иначе выполняем исходный запрос
  if (event.request.method !== 'GET' || !match(event.request.url)) {
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
      if (!isAPIRequest) {
        event.waitUntil(cache.add(event.request));
      }

      console.log('cached:', cached);

      return cached;
    }

    // Ничего не закэшировалось - делаем исходный запрос
    const response = await fetch(event.request);

    // Если запрос успешно прошел и он same origin - кэшируем его
    if (response?.ok && response?.type === 'basic') {
      await cache.put(event.request, response.clone());
    }

    return response
  })());
  //
  // if (navigator.onLine) {
  //   if (event.request.method === 'GET' && match(event.request.url)) {
  //     caches.open(cacheName).then((cache) => {
  //       cache.add(event.request.url);
  //     });
  //   }
  //   return;
  // }
  // if (event.request.method === 'GET') {
  //   event.respondWith(caches.match(event.request).then((cachedResponse) => cachedResponse));
  // }
});
