import 'react-native-browser-polyfill';
import App from './app/App.react';
import Component from 'react-pure-render/component';
import React, { AppRegistry, Platform } from 'react-native';
import configureStore from '../common/configureStore';
import { Provider } from 'react-redux';

export default function index() {
  // TODO: Use common/config.
  const initialState = {
    config: {
      firebaseUrl: 'https://este.firebaseio.com'
    },
    intl: {
      locales: ['cs', 'en'],
      currentLocale: 'en'
    },
    device: {
      isMobile: true,
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
