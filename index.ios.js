// Polyfill the things
import './src/lib/polyfill.js';
import './node_modules/intl/index.js';
import './node_modules/intl/locale-data/jsonp/en.js';

// Load app
import {AppRegistry} from 'react-native';
AppRegistry.registerComponent('este', () => require('./app/app.react.js'));
