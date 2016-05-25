/* eslint-disable no-console */
import args from './support/args';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';

const urls = {
  '/': 'index.html',
  '/404': '404.html'
};

gulp.task('to-html', done => {
  args.production = true;
  process.env.IS_SERVERLESS = true;

  const fetch = url => new Promise((resolve, reject) => {
    require('http').get({ host: 'localhost', path: url, port: 8000 }, res => {
      // Explicitly treat incoming data as utf8 (avoids issues with multi-byte).
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });

  const moveAssets = () => {
    const assets = fs.readdirSync('build');
    fs.mkdirSync(path.join('build', 'assets'));
    assets.forEach(fileName => {
      fs.renameSync(
        path.join('build', fileName),
        path.join('build', 'assets', fileName)
      );
    });
  };

  const toHtml = () => {
    const promises = Object.keys(urls).map(url => fetch(url).then(html => {
      fs.writeFile(path.join('build', urls[url]), html);
    }));
    return Promise.all(promises);
  };

  runSequence('eslint-ci', 'mocha', 'clean', 'build', () => {
    const proc = require('child_process').spawn('node', ['./src/server']);
    proc.stderr.on('data', data => console.log(data.toString()));
    proc.stdout.on('data', async data => {
      data = data.toString();
      if (data.indexOf('Server started') === -1) return;
      try {
        moveAssets();
        await toHtml();
      } catch (error) {
        console.log(error);
      } finally {
        proc.kill();
        done();
        console.log('App has been rendered to /build directory.');
        console.log('OSX tip: cd build && python -m SimpleHTTPServer 8000');
      }
    });
  });
});
