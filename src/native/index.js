import 'react-native-browser-polyfill';
import App from './app/App.react';
import React, {AppRegistry, Component} from 'react-native';
import configureStore from '../common/configureStore';
import {Provider} from 'react-redux/native';
import {setPlatform} from '../common/device/actions';

// TODO: We can't use <IntlProvider> yet because it's not ready for
// react-native. Therefore we can't use <FormattedMessage> etc.
// https://github.com/yahoo/react-intl/issues/119
// Nevermind, we can use plain old format from intl. Check todos Header.
// import {IntlProvider} from 'react-intl';
// TODO: Wait for react-native will support React 0.14

import '../../node_modules/intl/index.js';
import '../../node_modules/intl/locale-data/jsonp/en.js';

export default function index(platform) {

  // TODO: Add engine.
  const initialState = {
    device: {
      isMobile: true
    }
  };
  const store = configureStore({initialState});
  // Set platform, ios or android.
  store.dispatch(setPlatform(platform));

  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          {/* TODO: Wait for update to remove wrapper function. */}
          {() => <App />}
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('Este', () => Root);

}
