import App from './app/App.react';
import Component from 'react-pure-render/component';
import FBSDK from 'react-native-fbsdk';
import Locale from 'react-native-locale'; // eslint-disable-line import/no-unresolved
import React from 'react';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { fromJSON } from '../common/transit';
import { initialTransitState } from './initialState';

// import { AsyncStorage } from 'react-native';
// setTimeout(async () => {
//   const keys = await AsyncStorage.getAllKeys();
//   console.log(keys);
// }, 1000)

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
    .set('currentLocale', getDefaultDeviceLocale())
    .set('defaultLocale', getDefaultDeviceLocale())
    .set('initialNow', Date.now()),
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: { FBSDK, createStorageEngine },
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
