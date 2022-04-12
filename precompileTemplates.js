const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const Handlebars = require('handlebars');

function precompileTemplates(startDirname) {
  const stack = [startDirname];
  const templates = [];

  while (stack.length > 0) {
    const dirname = stack.pop();

    fs.readdirSync(dirname, { withFileTypes: true }).forEach((dirEntry) => {
      const fullPath = `${dirname}/${dirEntry.name}`;

      if (dirEntry.isDirectory()) {
        stack.push(fullPath);
      } else if (dirEntry.isFile() && dirEntry.name.endsWith('.hbs')) {
        if (fullPath === `${startDirname}/index.hbs`) {
          return;
        }
        const relPath = `${fullPath.slice(startDirname.length + 1)}`;
        console.log(`Precompile ${relPath}...`);
        templates.push(`${relPath}.precompile.js`);

        exec(
          `$(npm bin)/handlebars ${fullPath} -f ${fullPath}.precompile.js`,
          (err, stdout, stderr) => {
            if (err) {
              console.log(err);
              console.log(stderr);
            }
          },
        );
      }
    });
  }

  return templates;
}

const templates = precompileTemplates(path.resolve(__dirname, 'src'));
const srcPath = path.resolve(__dirname, 'src');
const indexTemplateSrc = fs.readFileSync(`${srcPath}/index.hbs`).toString();
const indexTemplate = Handlebars.compile(indexTemplateSrc);
fs.writeFileSync(`${srcPath}/index.html`, indexTemplate({ templates }));
