import Color from 'color';

//  - Prefer styled app/components over shared StyleSheet instances.
//  - Use theme.fontSize for the responsive sizing // pxtoem.com
//  - Learn React Native flexbox
//    - facebook.github.io/react-native/docs/style.html
//    - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
//  - Learn UI vocabulary
//    - v4-alpha.getbootstrap.com/getting-started/introduction
//    - developer.apple.com/ios/human-interface-guidelines
//    - developer.android.com/guide/practices/ui_guidelines
//  - Constants taken from the Bootstrap 4

const darken = color => Color(color).darken(.3).hexString();
const lighten = color => Color(color).lighten(.3).hexString();

const fontSize = 16;
const fontFamily = 'System';
const lineHeight = fontSize * 1.5;

const textColor = '#7C7C7C';
const backgroundColor = '#fff';
const inverseTextColor = '#eee';
const inverseBackgroundColor = '#2C2C2C';

const brandPrimary = '#31AACC';
const brandSuccess = '#5cb85c';
const brandInfo = '#5bc0de';
const brandWarning = '#f0ad4e';
const brandDanger = '#d9534f';

const activeOpacity = .5;
const disabledOpacity = .3;

export default {
  // Basic
  fontSize,
  fontFamily,
  lineHeight,
  textColor,
  backgroundColor,
  inverseTextColor,
  inverseBackgroundColor,
  brandPrimary,
  brandSuccess,
  brandInfo,
  brandWarning,
  brandDanger,
  activeOpacity,
  disabledOpacity,
  // Derived
  placeholderTextColor: lighten(textColor),
  fontSizeH1: fontSize * 2.5,
  fontSizeH2: fontSize * 2,
  fontSizeH3: fontSize * 1.75,
  fontSizeH4: fontSize * 1.5,
  fontSizeH5: fontSize * 1.25,
  // Helpers
  darken,
  lighten,
};
