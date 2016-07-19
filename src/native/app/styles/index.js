import Color from 'color';
import { StyleSheet } from 'react-native';

// How to learn React Native styles:
//  - facebook.github.io/react-native/docs/style.html
//  - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6

// Note app theme and styles are placed in this one file, but can and should be
// refactored to more files later. Note also a component specific styles should
// be stored at a component directory, not here.
// TODO: Use Platform.select.

export const theme = {
  lighten(color) { return Color(color).lighten(.3).hexString(); },
  darken(color) { return Color(color).darken(.3).hexString(); },

  textColor: '#7C7C7C',
  inverseTextColor: '#fff',
  fontSizeBase: 16,
  backgroundColor: '#fff',
  brandPrimary: '#31AACC',

  // Sizes from Bootstrap 4
  get fontSizeH1() { return this.fontSizeBase * 2.5; },
  get fontSizeH2() { return this.fontSizeBase * 2; },
  get fontSizeH3() { return this.fontSizeBase * 1.75; },
  get fontSizeH4() { return this.fontSizeBase * 1.5; },
  get fontSizeH5() { return this.fontSizeBase * 1.25; },
};

export default StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  text: {
    color: theme.textColor,
    fontSize: theme.fontSizeBase,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
