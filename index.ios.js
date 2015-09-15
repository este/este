// Polyfill the things
import './src/lib/polyfill.js';
import './node_modules/intl/index.js';
import './node_modules/intl/locale-data/jsonp/en.js';
import React, {AppRegistry} from 'react-native';
import App from './src/app/app.react';

// Redux
import {Provider} from 'react-redux';
import store from './src/store';

class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

};

AppRegistry.registerComponent('este', () => Root);
