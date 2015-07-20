// This is a little workaround to use custom babel transformations with
// React. This is currently copied to node_modules in postinstall hook, but
// will be normally mounted with React 0.8 as it allows custom transformers to
// be specified

/*eslint-disable */

/**
 * Note: This is a fork of the React Native transform.js file. All credits
 * belong to Facebook team unless noted explicitly.
 */

var babel = require('babel');

function transform(srcTxt, filename, options) {
  var result = babel.transform(srcTxt, {
    retainLines: true,
    compact: true,
    comments: false,
    filename: filename,
    whitelist: [
      'es6.arrowFunctions',
      'es6.blockScoping',
      'es6.classes',
      'es6.destructuring',
      'es6.parameters',
      'es6.properties.computed',
      'es6.properties.shorthand',
      'es6.modules',
      'es6.spread',
      'es7.decorators',
      'es7.classProperties',
      'es6.templateLiterals',
      'es7.trailingFunctionCommas',
      'es7.objectRestSpread',
      'flow',
      'react',
      'react.displayName',
    ],
    sourceFileName: filename,
    sourceMaps: false,
    extra: options || {},
  });

  return {
    code: result.code,
  };
}

module.exports = function(data, callback) {
  var result;
  try {
    result = transform(
      data.sourceCode,
      data.filename
    );
  } catch (e) {
    callback(e);
    return;
  }

  callback(null, result);
};

// export for use in jest
module.exports.transform = transform;
