const http = require('http');
const fs = require('fs');
const debug = require('debug');

const log = debug('server');

const SERVER_PORT = 3000;

const server = http.createServer((req, res) => {
  const { url } = req;

  log('request', req.url);

  const regex = '[^\n]+[.][^\n]+';
  const nestedFileName = `${url}${url}`.match(regex) ? `${url.split('.')[0]}${url}`.match(regex)[0] : `${url}${url}.html`;
  const isIndex = `${url}`.match('[^\n]+[index][^\n]+');
  const indexFileName = isIndex ? `${url}`.match('[^\n]+[index][^\n]+')[0] : '/index.html';

  const fileName = url === '/' || isIndex ? indexFileName : nestedFileName;

  log('filename:', fileName);

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
