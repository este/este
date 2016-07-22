// import SignInError from './SignInError.react';
import Component from 'react-pure-render/component';
import Email from './Email.react';
import React from 'react';
import Social from './Social.react';
import theme from '../app/theme';
import { View } from 'react-native';

export default class SignIn extends Component {

  render() {
    return (
      <View>
        <Email style={{ marginBottom: theme.fontSizeH2 }} />
        <Social />
        {/* <SignInError /> */}
      </View>
    );
  }

}
