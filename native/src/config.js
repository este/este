/* global __DEV__ */

const prodConfig = {
  env: 'production'
};

// Put your dev config here to override production/common settings
const devConfig = {
  env: 'development'
};

export default __DEV__
  ? devConfig
  : {...devConfig, ...prodConfig};
