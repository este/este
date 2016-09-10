/* @flow */
import FBSDK from 'react-native-fbsdk';
import React from 'react';
import Root from './app/Root';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import uuid from 'react-native-uuid';
import { AppRegistry, NativeModules, Platform } from 'react-native';
import { fromJSON } from '../common/transit';
import { initialTransitState } from './initialState';

const initialState = fromJSON(initialTransitState);

const getDefaultDeviceLocale = () => {
  const { defaultLocale, locales } = initialState.intl;
  const deviceLocale = NativeModules.SettingsManager.settings
    .AppleLocale.split('_')[0];
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

const Este = () => (
  <Root store={store} />
);

AppRegistry.registerComponent('Este', () => Este);
