// import SignInError from './SignInError.react';
import Component from 'react-pure-render/component';
import Email from './Email.react';
import React from 'react';
import Social from './Social.react';
import theme from '../../common/app/theme';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  email: {
    marginBottom: theme.fontSize * 3,
    width: theme.fontSize * 13,
  },
  social: {
    alignSelf: 'center',
  },
});

export default class SignIn extends Component {

  render() {
    return (
      <View>
        <Email style={styles.email} />
        <Social style={styles.social} />
        {/* <SignInError /> */}
      </View>
    );
  }

}
