const http = require('http');
const fs = require('fs');
const debug = require('debug');

const log = debug('server');

const SERVER_PORT = 3000;

const server = http.createServer((req, res) => {
  const { url } = req;
  log('request', req.url);

  const fileName = url === '/' ? '/index.html' : url;

  fs.readFile(`${__dirname}/../public/${fileName}`, (err, file) => {
    if (err) {
      log('error');
      res.write('not found');
      res.end();
      return;
    }
    res.write(file);
    res.end();
  });
});

server.listen(SERVER_PORT);
