// @flow
/* eslint-disable guard-for-in, no-restricted-syntax, fp/no-mutating-assign */
// This is temp fix for github.com/rofrischmann/fela/issues/191
// On the server, we have to use all prefixes because we don't know browser.
// On the client, we have to make try-catch detection.

const customProperty = (style, properties) => {
  for (const property in style) {
    const value = style[property];
    if (properties[property]) {
      Object.assign(style, properties[property](value));
      delete style[property];
    }
    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = customProperty(value, properties);
    }
  }
  return style;
};

const placeholderPrefixes = [
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  '::-webkit-input-placeholder',
  ':-moz-placeholder',
  '::placeholder',
];

let placeholderPrefix;
const isBrowser = typeof document !== 'undefined';

if (isBrowser) {
  const style = document.createElement('style');
  document.head.appendChild(style);
  const sheet = style.sheet;
  placeholderPrefix = placeholderPrefixes.find(placeholder => {
    try {
      if (sheet && typeof sheet.insertRule === 'function') {
        sheet.insertRule(`${placeholder}{}`, 0);
      }
    } catch (e) {
      return false;
    }
    return true;
  });
  document.head.removeChild(style);
}

const placeholderPrefixerBrowser = () => (style: Object) => {
  const computedStyle = customProperty(style, {
    '::placeholder': value => ({ [placeholderPrefix || '']: value }),
  });
  delete computedStyle['::placeholder'];
  return computedStyle;
};

const placeholderPrefixerServer = () =>
  (style: Object) => customProperty(style, {
    '::placeholder': value => placeholderPrefixes.reduce((style, prefix) => {
      style[prefix] = value;
      return style;
    }, {}),
  });

const placeholderPrefixer = isBrowser
  ? placeholderPrefixerBrowser
  : placeholderPrefixerServer;

export default placeholderPrefixer;
