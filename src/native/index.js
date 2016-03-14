import 'react-native-browser-polyfill';
import App from './app/App.react';
import Component from 'react-pure-render/component';
import React, { AppRegistry, Platform } from 'react-native';
import config from './config';
import configureStore from '../common/configureStore';
import messages from './messages';
import { Provider } from 'react-redux';

// Yeah, require because polyfillLocales is shared with CommonJS Node code.
require('../server/intl/polyfillLocales')(self, config.locales);

export default function index() {
  const initialState = {
    config: {
      firebaseUrl: config.firebaseUrl
    },
    intl: {
      // TODO: Detect native current locale.
      currentLocale: config.defaultLocale,
      locales: config.locales,
      messages
    },
    device: {
      platform: Platform.OS
    }
  };
  const store = configureStore({ initialState });

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
