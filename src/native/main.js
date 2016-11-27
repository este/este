/* @flow */
import FBSDK from 'react-native-fbsdk';
import React from 'react';
import ReactNativeI18n from 'react-native-i18n';
import Root from './app/Root';
import configureStore from '../common/configureStore';
import initialState from './initialState';
import uuid from 'react-native-uuid';
import { AppRegistry, AsyncStorage, Platform } from 'react-native';

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
    isReactNative: true,
    platform: Platform.OS,
  },
  intl: {
    ...initialState.intl,
    currentLocale: getDefaultDeviceLocale(),
  },
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: { FBSDK, uuid, storageEngine: AsyncStorage },
});

const Este = () => (
  <Root store={store} />
);

AppRegistry.registerComponent('Este', () => Este);
