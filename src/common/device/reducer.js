/* @flow weak */
const initialState = {
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
};

const deviceReducer = (state = initialState) => state;

export default deviceReducer;
