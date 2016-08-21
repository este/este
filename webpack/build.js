/* @flow weak */
import gutil from 'gulp-util';
import makeWebpackConfig from './makeConfig';
import webpack from 'webpack';

const build = done => {
  const config = makeWebpackConfig({ isDevelopment: false });
  webpack(config, (fatalError, stats) => {
    const jsonStats = stats.toJson();

    // We can save jsonStats to be analyzed with
    // github.com/robertknight/webpack-bundle-size-analyzer.
    // $ webpack-bundle-size-analyzer ./bundle-stats.json
    // const fs = require('fs');
    // fs.writeFileSync('./bundle-stats.json', JSON.stringify(jsonStats));

    const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

    if (buildError) {
      throw new gutil.PluginError('webpack', buildError);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    }));

    done();
  });
};

export default build;
