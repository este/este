import Home from './pages/home.react';
import Login from './pages/login.react';
import {
  Navigator
} from 'react-native';

export default {

  home: {
    component: Home
  },

  login: {
    component: Login,
    animationType: {
      ...Navigator.SceneConfigs.FloatFromBottom,
      gestures: null
    }
  }

};
