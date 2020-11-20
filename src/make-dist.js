const fs = require('fs');
const path = require('path');
const glob = require('glob-all');
const slugify = require('slug');
// https://github.com/thejoshwolfe/yazl/blob/master/examples/zip.js
const Yazl = require('yazl');

const rawdata = fs.readFileSync('./package.json');
const pckJson = JSON.parse(rawdata);
const slug = slugify(pckJson.name, {charmap: {'.': '-'}});

const dest = `dist/${slug}.zip`;
const zipfile = new Yazl.ZipFile();
const options = { compress: false, forceZip64Format: true };
const files = glob.sync([
    '**',
    '!node_modules', '!node_modules/**',
    '!dist', '!dist/**',
    '!package-lock.json',
], { mark: true }).filter(function(f) { return !/\/$/.test(f); });

console.log('Zipping to ', dest);

const destDir = path.dirname(dest);
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

files.forEach(file => {
    console.log('Adding', file);
    zipfile.addFile(file, file, Object.assign({
        compress: options.compress,
        mtime: new Date(),
        mode: null,
    }, options));
});

zipfile.outputStream.pipe(fs.createWriteStream(dest)).on("close", function() {
    console.log("Done");
});

zipfile.end({ forceZip64Format: options.forceZip64Format }, function(finalSize) {
    console.log("FinalSize prediction: " + finalSize);
});