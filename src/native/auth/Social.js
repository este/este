// @flow
import type { State } from '../../common/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Box } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signIn } from '../../common/auth/actions';

const SocialLoginButton = (
  {
    backgroundColor,
    message,
    name,
    onPress,
  },
) => (
  <FormattedMessage {...message}>
    {message => (
      <Icon.Button
        backgroundColor={backgroundColor}
        name={name}
        onPress={onPress}
      >
        {message}
      </Icon.Button>
    )}
  </FormattedMessage>
);

type SocialProps = {
  disabled: boolean,
  signIn: typeof signIn,
};

const Social = (
  {
    disabled,
    signIn,
  }: SocialProps,
) => {
  const onPress = () => {
    if (disabled) return;
    signIn('facebook', { isNative: true });
  };
  return (
    <Box height={2} justifyContent="center" alignItems="center">
      <SocialLoginButton
        backgroundColor="#3b5998"
        message={buttonsMessages.facebookSignIn}
        name="facebook"
        onPress={onPress}
      />
      {/* TODO: Add more social login buttons. */}
    </Box>
  );
};

export default connect(
  (state: State) => ({
    disabled: state.auth.formDisabled,
  }),
  { signIn },
)(Social);
