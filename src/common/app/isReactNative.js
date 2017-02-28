// @flow

const isReactNative = typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

export default isReactNative;
