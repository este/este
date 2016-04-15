import 'react-native-browser-polyfill';
import App from './app/App.react';
import Component from 'react-pure-render/component';
import React, { AppRegistry, Platform } from 'react-native';
import config from './config';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import messages from './messages';
import { Provider } from 'react-redux';

require('../server/intl/polyfillLocales')(self, config.locales);

export default function index() {
  const initialState = {
    config: {
      appName: config.appName,
      firebaseUrl: config.firebaseUrl
    },
    intl: {
      currentLocale: config.defaultLocale, // TODO: Detect native locale.
      defaultLocale: config.defaultLocale,
      initialNow: Date.now(),
      locales: config.locales,
      messages
    },
    device: {
      platform: Platform.OS
    }
  };
  const store = configureStore({ createEngine, initialState });

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
