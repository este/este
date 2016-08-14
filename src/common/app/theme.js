import Color from 'color';

// Styling & Flexbox
//   facebook.github.io/react-native/docs/style.html
//   medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
// Vocabulary
//   developer.apple.com/ios/human-interface-guidelines
//   developer.android.com/guide/practices/ui_guidelines
//   v4-alpha.getbootstrap.com/getting-started/introduction
// Tips
//   Favour styled app/components over shared StyleSheets
//   Leverage theme.fontSize for responsive sizing, check pxtoem.com

export default {
  fontSize: 16,
  fontFamily: 'System',
  lineHeight: 1.5,
  textColor: '#7C7C7C',
  backgroundColor: '#fff',
  inverseTextColor: '#eee',
  inverseBackgroundColor: '#2C2C2C',
  separator: '#f1f1f1',

  brandPrimary: '#31AACC',
  brandSuccess: '#5cb85c',
  brandInfo: '#5bc0de',
  brandWarning: '#f0ad4e',
  brandDanger: '#d9534f',

  activeOpacity: .5,
  disabledOpacity: .3,

  darken: .3,
  lighten: .3,

  get placeholderTextColor() { return this.light(this.textColor); },

  get fontSizeH1() { return this.fontSize * 2.5; },
  get fontSizeH2() { return this.fontSize * 2; },
  get fontSizeH3() { return this.fontSize * 1.75; },
  get fontSizeH4() { return this.fontSize * 1.5; },
  get fontSizeH5() { return this.fontSize * 1.25; },
  get fontSizeH6() { return this.fontSize * 1; },

  dark(color) { return Color(color).darken(this.darken).hexString(); },
  light(color) { return Color(color).lighten(this.lighten).hexString(); },
};
