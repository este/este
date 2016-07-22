import Color from 'color';

// Learn React Native styles:
//  - facebook.github.io/react-native/docs/style.html
//  - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
// Tips:
//  - Note there is no shared styles. Favour prestyled app/components instead.
//  - Use theme.fontSizeBase for responsive layouts (mobile, tablet, etc.)
//    - example: paddingBottom: theme.fontSizeBase * 1.5 // pxtoem.com
//  - Use Platform.select for platform specific styles and theme constants
//  - Use vocabulary from:
//    - v4-alpha.getbootstrap.com/getting-started/introduction
//    - developer.apple.com/ios/human-interface-guidelines
//    - developer.android.com/guide/practices/ui_guidelines

export default {
  backgroundColor: '#fff',
  brandPrimary: '#31AACC',
  buttonActiveOpacity: .5,
  fontSizeBase: 16,
  inverseBackgroundColor: '#2C2C2C',
  inverseTextColor: '#fff',
  textColor: '#7C7C7C',

  // Multiples from Bootstrap 4
  get fontSizeH1() { return this.fontSizeBase * 2.5; },
  get fontSizeH2() { return this.fontSizeBase * 2; },
  get fontSizeH3() { return this.fontSizeBase * 1.75; },
  get fontSizeH4() { return this.fontSizeBase * 1.5; },
  get fontSizeH5() { return this.fontSizeBase * 1.25; },

  // Example: { borderBottomColor: theme.lighten(theme.brandPrimary) }
  lighten: color => Color(color).lighten(.3).hexString(),
  darken: color => Color(color).darken(.3).hexString(),
};
