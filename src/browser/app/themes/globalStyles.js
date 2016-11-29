/* @flow */
const globalStyles = {
  '*': {
    // Because box-sizing is not inherited.
    boxSizing: 'border-box',
  },

  html: {
    // Changes the default tap highlight to be completely transparent in iOS.
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    // Prevent adjustments of font size after orientation changes in IE and iOS.
    MsTextSizeAdjust: '100%',
    WebkitTextSizeAdjust: '100%',
  },

  body: {
    // Remove the margin in all browsers.
    margin: 0,
  },
};

export default globalStyles;
