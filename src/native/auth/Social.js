/* @flow */
import type { State } from '../../common/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from '../app/components';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../common/auth/actions';

const SocialLoginButton = ({ backgroundColor, message, name, onPress }) =>
  <FormattedMessage {...message}>
    {message =>
      <Icon.Button
        backgroundColor={backgroundColor}
        name={name}
        onPress={onPress}
      >{message}</Icon.Button>
    }
  </FormattedMessage>;

SocialLoginButton.propTypes = {
  backgroundColor: React.PropTypes.string.isRequired,
  message: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

const Social = ({ disabled, signIn, style }) => {
  const onFacebookLoginPress = () => {
    if (disabled) return;
    signIn('facebook', { isNative: true });
  };
  return (
    <View style={style}>
      <SocialLoginButton
        backgroundColor="#3b5998"
        message={buttonsMessages.facebookSignIn}
        name="facebook"
        onPress={onFacebookLoginPress}
      />
      {/* TODO: Add more social login buttons. */}
    </View>
  );
};

Social.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  signIn: React.PropTypes.func.isRequired,
  style: View.propTypes.style,
};

export default connect(
  (state: State) => ({
    disabled: state.auth.formDisabled,
  }),
  { signIn },
)(Social);
