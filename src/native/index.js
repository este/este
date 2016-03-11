import 'react-native-browser-polyfill';
import App from './app/App.react';
import Component from 'react-pure-render/component';
import React, { AppRegistry, Platform } from 'react-native';
import configureStore from '../common/configureStore';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

export default function index() {
  const initialState = {
    config: {
      // TODO: Use common config for dev and production via gulp task.
      firebaseUrl: 'https://este.firebaseio.com'
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
          <IntlProvider locale="en">
            <App />
          </IntlProvider>
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('Este', () => Root);
}
