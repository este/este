// @flow
import isReactNative from './isReactNative';

const isClient = process.env.IS_BROWSER || isReactNative;

export default isClient;
