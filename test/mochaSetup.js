/* global global */

require('babel/register')({
  stage: 0
});

let jsdom = require('jsdom');

// Setup the simplest document possible
let doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Get the window object out of the document
let win = doc.defaultView;

// Set globals for mocha that make access to document and window feel
//  natural in the test environment
global.document = doc;
global.window = win;

// Take all properties of the window object and also attach it to the
//  mocha global object
propagateToGlobal(win);

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  };
};
