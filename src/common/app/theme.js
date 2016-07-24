import Color from 'color';

// Tips:
//  - Prefer styled app/components over shared StyleSheet instances.
//  - Use theme.fontSize for the responsive sizing // pxtoem.com
//  - Learn React Native flexbox
//    - facebook.github.io/react-native/docs/style.html
//    - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
//  - Learn UI vocabulary
//    - v4-alpha.getbootstrap.com/getting-started/introduction
//    - developer.apple.com/ios/human-interface-guidelines
//    - developer.android.com/guide/practices/ui_guidelines

const darken = color => Color(color).darken(.3).hexString();
const lighten = color => Color(color).lighten(.3).hexString();

const fontSize = 16;

const textColor = '#7C7C7C';
const backgroundColor = '#fff';
const inverseTextColor = '#eee';
const inverseBackgroundColor = '#2C2C2C';

const brandPrimary = '#31AACC';

const activeOpacity = .5;
const disabledOpacity = .3;

export default {
  // Basic
  fontSize,
  textColor,
  backgroundColor,
  inverseTextColor,
  inverseBackgroundColor,
  brandPrimary,
  activeOpacity,
  disabledOpacity,
  // Derived
  placeholderTextColor: lighten(textColor),
  fontSizeH1: fontSize * 2.5, // From the Bootstrap 4
  fontSizeH2: fontSize * 2,
  fontSizeH3: fontSize * 1.75,
  fontSizeH4: fontSize * 1.5,
  fontSizeH5: fontSize * 1.25,
  // Helpers
  darken,
  lighten,
};
