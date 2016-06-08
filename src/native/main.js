import App from './app/App.react';
import Component from 'react-pure-render/component';
import Locale from 'react-native-locale'; // eslint-disable-line import/no-unresolved
import React from 'react';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import initialState from './initialState';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';

const getCurrentLocale = () => {
  const currentLocale = Locale.constants().localeIdentifier.split('_')[0];
  const { intl: { defaultLocale, locales } } = initialState;
  return locales.indexOf(currentLocale) !== -1
    ? currentLocale
    : defaultLocale;
};

const createNativeInitialState = () => ({
  ...initialState,
  intl: {
    ...initialState.intl,
    currentLocale: getCurrentLocale(),
    initialNow: Date.now(),
  },
  device: {
    platform: Platform.OS,
  },
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: { createEngine },
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
