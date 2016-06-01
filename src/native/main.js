import App from './app/App.react';
import Component from 'react-pure-render/component';
import React from 'react';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import initialState from './initialState';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';

const createNativeInitialState = () => ({
  ...initialState,
  intl: {
    ...initialState.intl,
    // currentLocale: // TODO: Detect native locale, use intl.locales.
    initialNow: Date.now(),
  },
  device: {
    platform: Platform.OS,
  },
});

const store = configureStore({
  createEngine,
  initialState: createNativeInitialState()
});

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
