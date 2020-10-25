// https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'projects/ngx-worker/src/lib');
const results = [];

function getDirContents(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((str) => {
    let filePath = path.join(directoryPath, str);
    if (fs.lstatSync(filePath).isFile()) {
      if (path.extname(filePath) === '.ts' && filePath.split('.spec.ts').length === 1) {
        results.push(filePath);
      }
    } else {
      getDirContents(filePath);
    }
  });
}

try {
  getDirContents(directoryPath);
  const fp = fs.createWriteStream(path.join(__dirname, 'projects/ngx-worker/src/public-api.ts'), {
    flags: 'w'
  });
  results.forEach((str) => {
    str = './lib/' + str.replace(/\\/g, '/').split('/lib/')[1].replace('.ts', '');
    fp.write('export * from \'' + str + '\';' + '\r\n');
  });
  fp.end();
} catch (e) {
  console.log(e.message);
}
