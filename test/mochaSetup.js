/* global global */

const jsdom = require('jsdom');

// Setup the simplest document possible
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Get the window object out of the document
const window = document.defaultView;

// Set globals for mocha that make access to document and window feel
//  natural in the test environment
global.document = document;
global.window = window;

// Take all properties of the window object and also attach it to the
//  mocha global object
propagateToGlobal(window);

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  };
};
