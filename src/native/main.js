// @flow
import type { Action } from '../common/types';
import FBSDK from 'react-native-fbsdk';
import React from 'react';
import ReactNativeI18n from 'react-native-i18n';
import Root from './app/Root';
import configureStorage from '../common/configureStorage';
import configureStore from '../common/configureStore';
import initialState from './initialState';
import uuid from 'react-native-uuid';
import { AppRegistry, AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

const getDefaultDeviceLocale = () => {
  const { defaultLocale, locales } = initialState.intl;
  const deviceLocale = ReactNativeI18n.locale.split('-')[0];
  const isSupported = locales.indexOf(deviceLocale) !== -1;
  return isSupported ? deviceLocale : defaultLocale;
};

const createNativeInitialState = () => ({
  ...initialState,
  device: {
    ...initialState.device,
  },
  intl: {
    ...initialState.intl,
    currentLocale: getDefaultDeviceLocale(),
  },
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: { FBSDK, uuid },
});

const Este = () => <Root store={store} />;

persistStore(
  store,
  {
    ...configureStorage(initialState.config.appName),
    storage: AsyncStorage,
  },
  () => {
    // Don't import appStarted action creator since it would break hot reload.
    store.dispatch(({ type: 'APP_STARTED' }: Action));
  },
);

AppRegistry.registerComponent('Este', () => Este);
