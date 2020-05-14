'use strict';

/**
 * Adds the js and css files from the build/static folder to the manifest.json
 */

const fs = require('fs');

const MANIFEST_DIR = './build/manifest.json';

let manifest = JSON.parse(fs.readFileSync(MANIFEST_DIR));

fs.readdirSync('./build/static/js').forEach((file) => {
  if (file.match(/.*?\.js$/g)) {
    manifest.content_scripts[0].js.push(`static/js/${file}`);
    console.log(`Added ${file} to js`);
  }
});

fs.readdirSync('./build/static/css').forEach((file) => {
  if (file.match(/.*?\.css$/g)) {
    manifest.content_scripts[0].css.push(`static/css/${file}`);
    console.log(`Added ${file} to css`);
  }
});

fs.writeFileSync(MANIFEST_DIR, JSON.stringify(manifest));

console.log('Added build files to manifest');
