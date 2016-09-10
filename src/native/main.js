/* @flow */
import FBSDK from 'react-native-fbsdk';
import React from 'react';
import ReactNativeI18n from 'react-native-i18n';
import Root from './app/Root';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import uuid from 'react-native-uuid';
import { AppRegistry, Platform } from 'react-native';
import { fromJSON } from '../common/transit';
import { initialTransitState } from './initialState';

const initialState = fromJSON(initialTransitState);

const getDefaultDeviceLocale = () => {
  const { defaultLocale, locales } = initialState.intl;
  const deviceLocale = ReactNativeI18n.locale.split('-')[0];
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
