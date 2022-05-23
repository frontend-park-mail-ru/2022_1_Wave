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

const config = {
  port: opt.argv.port ?? process.env.PORT ?? 8080,
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
        await proxyRequest(req, res, `http://localhost${req.url}`);
        return;
      }

      try {
        const file = await fs.readFile(path.resolve(__dirname, '..', 'build', req.url.slice(1)));
        res.writeHead(200);
        res.end(file);
      } catch (e) {
        res.writeHead(500);
        res.end(e.toString());
      }
      return;
    }

    if (req.url.toString().startsWith('/api')) {
      await proxyRequest(req, res, `http://localhost${req.url}`);
      return;
    }

    let type = 'website';
    let title = 'WaveMusic';
    let description = 'Best music service!';
    let image = 'http://localhost:8080/images/OG-LOGO.png';
    let url = 'https://wave-music.online';

    let match = req.url.toString().match(albumRegex);
    if (match) {
      try {
        const response = await fetch(`http://localhost/api/v1/albums/${match[1]}`);
        const album = (await response.json()).Result;
        title = `${album.title}`;
        description = `Album ${album.title} - ${album.artist}`;
        image = `http://localhost/${album.cover}`;
      } catch (e) {
        console.log(e);
      }
    }
    match = req.url.toString().match(artistRegex);
    if (match) {
      try {
        const response = await fetch(`http://localhost/api/v1/artists/${match[1]}`);
        const artist = (await response.json()).Result;
        title = `${artist.name}`;
        description = `Artist ${artist.name}`;
        image = `http://localhost/${artist.cover}`;
      } catch (e) {
        console.log(e);
      }
    }
    match = req.url.toString().match(playlistRegex);
    if (match) {
      try {
        const response = await fetch(`http://localhost/api/v1/playlists/${match[1]}`);
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
    res.writeHead(200);
    res.end(file);
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end(e.toString());
  }
}

const server = http.createServer(mux);
server
  .listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
  });
