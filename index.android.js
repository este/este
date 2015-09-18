// Polyfill the things
import './src/lib/polyfill.js';
import './node_modules/intl/index.js';
import './node_modules/intl/locale-data/jsonp/en.js';

// Register app
import {AppRegistry} from 'react-native';
import Root from './src';

AppRegistry.registerComponent('este', () => Root);
