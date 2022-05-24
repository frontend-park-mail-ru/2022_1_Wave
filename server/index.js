const http = require('http');
const mime = require('mime-types');
const path = require('path');
const opt = require('optimist');
const fs = require('fs').promises;
const openGraph = require('./open-graph');

const albumRegex = /\/album\/([0-9])$/;
const artistRegex = /\/artist\/([0-9])$/;
const playlistRegex = /\/playlists\/([0-9])$/;

const fetch = (...args) => import('node-fetch').then(({default: nodeFetch}) => nodeFetch(...args));

let config = {
  port: opt.argv.port ?? process.env.PORT ?? 8080,
  host: "",
  api_host: "",
  static_host: "",
  schema: "http",
};

const proxyRequest = async (req, res, url) => {
  const newReq = http.request(url, {
    method: req.method,
    headers: req.headers,
  }, (newRes) => {
    Object.entries(newRes.headers).forEach(([h, val]) => {
      res.setHeader(h, val);
    })
    res.writeHead(newRes.statusCode);

    newRes.on('data', (chunk) => {
      res.write(chunk);
    });

    newRes.on('end', () => { res.end() });
  });

  for await (const chunk of req) {
    newReq.write(chunk);
  }

  newReq.end();
}

const mux = async (req, res) => {
  try {
    const mimeType = mime.lookup(req.url);

    if (mimeType) {
      if (req.method !== 'GET') {
        req.writeHead(405);
        req.end(`Method ${req.method} is not allowed`);
        return;
      }

      if (req.url.toString().startsWith('/assets')) {
        await proxyRequest(req, res, `${config.schema}://${config.static_host}${req.url}`);
        return;
      }

      try {
        const file = await fs.readFile(path.resolve(__dirname, '..', 'build', req.url.slice(1)));
        res.setHeader('Content-Type', mimeType);
        res.writeHead(200);
        res.end(file);
      } catch (e) {
        res.writeHead(500);
        res.end(e.toString());
      }
      return;
    }

    if (req.url.toString().startsWith('/api')) {
      await proxyRequest(req, res, `${config.schema}://${config.api_host}${req.url}`);
      return;
    }

    const type = 'website';
    let title = 'WaveMusic';
    let description = 'Best music service!';
    let image = `${config.schema}://${config.static_host}/assets/OG-LOGO.png`;
    const url = 'https://wave-music.online';

    let match = req.url.toString().match(albumRegex);
    if (match) {
      try {
        const response = await fetch(`${config.schema}://${config.api_host}/api/v1/albums/${match[1]}`);
        const album = (await response.json()).Result;
        title = `${album.title}`;
        description = `Album ${album.title} - ${album.artist}`;
        image = `${config.schema}://${config.static_host}/${album.cover}`;
      } catch (e) {
        console.log(e);
      }
    }
    match = req.url.toString().match(artistRegex);
    if (match) {
      try {
        const response = await fetch(`${config.schema}://${config.api_host}/api/v1/artists/${match[1]}`);
        const artist = (await response.json()).Result;
        title = `${artist.name}`;
        description = `Artist ${artist.name}`;
        image = `${config.schema}://${config.static_host}/${artist.cover}`;
      } catch (e) {
        console.log(e);
      }
    }
    match = req.url.toString().match(playlistRegex);
    if (match) {
      try {
        const response = await fetch(`${config.schema}://${config.api_host}/api/v1/playlists/${match[1]}`);
        const playlist = (await response.json()).Result;
        title = `${playlist.title}`;
        description = `Playlist ${playlist.title}`;
      } catch (e) {
        console.log(e);
      }
    }

    let file = await fs.readFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    file = file.toString('utf-8').replace(
      '<head>',
      `<head>${openGraph({
        type,
        title,
        description,
        image,
        url,
      })}`);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.writeHead(200);
    res.end(file);
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end(e.toString());
  }
}

const server = http.createServer(mux);
const confPath = process.env.WAVEFRONTENV === 'production' ? 'config.prod.json' : 'config.dev.json';
fs.readFile(path.resolve(__dirname,confPath)).then((data) => {
  config = JSON.parse(data);
  console.log(config);
  server.listen(config.port, () => {
    console.log(`Server is running at ${config.schema}://localhost:${config.port}`);
  });
})
  .catch(err => {
    console.error(err)
  });


