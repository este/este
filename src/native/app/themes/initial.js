/* @flow weak */
import chroma from 'chroma-js';
import { Platform } from 'react-native';

export default {
  fontSize: Platform.select({
    android: 18,
    ios: 16,
  }),
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

  activeOpacity: 0.5,
  disabledOpacity: 0.3,

  darken: 0.3,
  brighten: 0.3,

  get placeholderTextColor() { return this.bright(this.textColor); },

  get fontSizeH1() { return this.fontSize * 2.5; },
  get fontSizeH2() { return this.fontSize * 2; },
  get fontSizeH3() { return this.fontSize * 1.75; },
  get fontSizeH4() { return this.fontSize * 1.5; },
  get fontSizeH5() { return this.fontSize * 1.25; },
  get fontSizeH6() { return this.fontSize * 1; },

  dark(color) { return chroma(color).darken(this.darken).hex(); },
  bright(color) { return chroma(color).brighten(this.brighten).hex(); },
};
