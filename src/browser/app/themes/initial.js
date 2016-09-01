/* @flow */
/*
  Styling
    - jxnblk.com/writing/posts/patterns-for-style-composition-in-react
    - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
    - Default rebass theme: github.com/jxnblk/rebass/blob/master/src/config.js
*/

const typography = {
  // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', // minimal set
  monospace: '"Roboto Mono", Menlo, Consolas, monospace',
  fontSizes: [48, 32, 24, 20, 16, 14, 12],
  lineHeight: 1.5,
  bold: 600,
  scale: [0, 8, 16, 32, 64], // rhythm
};

const colors = {
  primary: '#08e',
  secondary: '#888',
  info: '#08e',
  success: '#1c7',
  warning: '#f70',
  error: '#f52',
  // only grayscale
  black: '#333',
  gray: '#ddd',
  white: '#fff',
};

const borders = {
  borderRadius: 2,
  borderColor: 'rgba(0, 0, 0, .25)',
};

const inverted = colors.white;

const zIndex = [0, 2, 4, 8, 16];

const theme = {
  ...typography,
  colors,
  ...borders,
  inverted,
  zIndex,
};

export const setComponents = (theme: Object) => ({
  ...theme,
  Container: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes[4],
    lineHeight: theme.lineHeight,
  },
});

export default setComponents(theme);
