import 'react-native-browser-polyfill';
import App from './app/App.react';
import Component from 'react-pure-render/component';
import React, { AppRegistry, Platform } from 'react-native';
import config from '../common/config';
import configureStore from '../common/configureStore';
import { Provider } from 'react-redux';
import { setPlatform } from '../common/device/actions';

import '../../node_modules/intl/index.js';
import '../../node_modules/intl/locale-data/jsonp/en.js';

export default function index() {
  const initialState = {
    config: {
      firebaseUrl: config.firebaseUrl
    },
    device: {
      isMobile: true
    }
  };
  const store = configureStore({ initialState });
  store.dispatch(setPlatform(Platform.OS));

  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('Este', () => Root);
}
