import FBSDK from 'react-native-fbsdk';
import Locale from 'react-native-locale'; // eslint-disable-line import/no-unresolved
import React from 'react';
import Root from './app/Root';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import uuid from 'react-native-uuid';
import { AppRegistry, Platform } from 'react-native';
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

// Must be a ES6 class to ensure hot reload works for stateless components.
class Este extends React.Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}

AppRegistry.registerComponent('Este', () => Este);
