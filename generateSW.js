const glob = require('glob');
const fs = require('fs');

const cachedUrl = [
  glob.sync('./build/*/*'),
  glob.sync('./build/*'),
  '/login',
  '/signup',
].flat(Infinity)
  .map((url) => url.replace('./build', '').replace('./sw.js','/')).join('\',\'');

const content = fs.readFileSync('./src/sw.js');
let contentString = String(content);
contentString = contentString.replace('[]', `['${cachedUrl}']`);

fs.writeFileSync('./build/sw.js', contentString);