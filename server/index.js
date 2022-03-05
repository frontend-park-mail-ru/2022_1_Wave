const express = require('express');
const path = require('path');
const opt = require('optimist');
const fs = require('fs');
const chokidar = require('chokidar');
const Handlebars = require('handlebars');
const { exec } = require('child_process');

const srcPath = path.resolve(__dirname, '..', 'src');
let indexTemplateSrc = fs.readFileSync(`${srcPath}/index.hbs`).toString();
let indexTemplate = Handlebars.compile(indexTemplateSrc);

const templates = new Set();
const watchPath = path.resolve(__dirname, '..', 'src');

chokidar.watch(watchPath)
  .on('all', (event, fullPath) => {
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && fullPath.endsWith('.hbs')) {
      const relPath = fullPath.slice(watchPath.length + 1);
      const relPathCompiled = `${relPath}.precompile.js`;

      if (relPath === 'index.hbs') {
        indexTemplateSrc = fs.readFileSync(`${srcPath}/index.hbs`).toString();
        indexTemplate = Handlebars.compile(indexTemplateSrc);
        fs.writeFileSync(`${srcPath}/index.html`, indexTemplate({ templates }));
        return;
      }

      if (event === 'add') {
        templates.add(relPathCompiled);
      }

      if (event === 'add' || event === 'change') {
        exec(`$(npm bin)/handlebars ${fullPath} -f ${fullPath}.precompile.js`);
      }

      if (event === 'unlink') {
        templates.delete(relPathCompiled);
      }

      fs.writeFileSync(`${srcPath}/index.html`, indexTemplate({ templates }));
    }
  });

const config = {
  port: opt.argv.port ?? process.env.PORT ?? 3000,
};

const app = express();

app
  .use(express.static(path.resolve(__dirname, '..', 'src')))
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
  })
  .listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
  });
