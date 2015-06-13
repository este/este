// Browser ES6 Polyfill
require('babel/polyfill');

var testsContext = require.context('.', true, /spec.js$/);
testsContext.keys().forEach(testsContext);
