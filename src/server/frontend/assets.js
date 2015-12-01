import config from '../config';
import fs from '../lib/fs';
import path from 'path';

const DEFAULT = {js: 'app.js', css: 'app.css'};

const APP_JS_PATTERN = /^app\-\w+\.js$/;
const APP_CSS_PATTERN = /^app\-\w+\.css$/;

export default async function getAppAssetFilenamesAsync() { // eslint-disable-line space-before-function-paren
  if (!config.isProduction) return DEFAULT;

  try {
    // We need to find assets with hashes in build directory
    // so we use current directory of assets.js and create absolute location
    // of build directory without knowing from which location process was started
    const buildDir = path.resolve(__dirname, '..', '..', '..', 'build');
    const buildDirFiles = await fs.readdirAsync(buildDir);

    return {
      js: buildDirFiles.find(filename => APP_JS_PATTERN.test(filename)),
      css: buildDirFiles.find(filename => APP_CSS_PATTERN.test(filename))
    };
  }
  catch (e) {
    return DEFAULT;
  }
}
