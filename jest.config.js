module.exports = {
  setupFiles: ['raf/polyfill'],
  testPathIgnorePatterns: ['/node_modules/', '.next'],
  // https://stackoverflow.com/a/51554619/233902
  testURL: 'http://localhost/',
};
