import App from './app/App.react';
import FBSDK from 'react-native-fbsdk';
import Locale from 'react-native-locale'; // eslint-disable-line import/no-unresolved
import React, { Component } from 'react';
import configureStore from '../common/configureStore';
import createRoutes from './createRoutes';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import uuid from 'react-native-uuid';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { fromJSON } from '../common/transit';
import { initialTransitState } from './initialState';

const initialState = fromJSON(initialTransitState);

const getDefaultDeviceLocale = () => {
  const deviceLocale = Locale.constants().localeIdentifier.split('_')[0];
  const { defaultLocale, locales } = initialState.intl;
  const isSupported = locales.indexOf(deviceLocale) !== -1;
  return isSupported ? deviceLocale : defaultLocale;
};

const createNativeInitialState = () => ({
  ...initialState,
  device: initialState.device
    .set('isReactNative', true)
    .set('platform', Platform.OS),
  intl: initialState.intl
    .set('currentLocale', getDefaultDeviceLocale()),
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: { FBSDK, createStorageEngine, uuid },
});
const routes = createRoutes();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App routes={routes} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Este', () => Root);
