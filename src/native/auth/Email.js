// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import { Box, Button, Heading, Text, TextInput } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';
import { resetPassword, signIn, signUp } from '../../common/auth/actions';

const Buttons = props => (
  <Box flexDirection="row" justifyContent="space-between" {...props} />
);

type EmailProps = {
  disabled: boolean,
  fields: Object,
  intl: $IntlShape,
  resetPassword: typeof resetPassword,
  signIn: typeof signIn,
  signUp: typeof signUp,
};

type EmailState = {
  forgetPasswordIsShown: boolean,
  recoveryEmailSent: boolean,
};

class Email extends React.Component {
  state: EmailState = {
    forgetPasswordIsShown: false,
    recoveryEmailSent: false,
  };

  onSignInViaPasswordPress = () => {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  };

  onSignUpPress = () => {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  };

  onForgetPasswordPress = () => {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  };

  onResetPasswordPress = () => {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email);
    fields.$reset();
    this.setState({
      forgetPasswordIsShown: false,
      recoveryEmailSent: true,
    });
  };

  props: EmailProps;

  render() {
    const { disabled, fields, intl: { formatMessage } } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;

    return (
      <Box padding={1} paddingTop={2}>
        <Heading align="center" size={1} marginBottom={2}>
          {formatMessage(legendMessage)}
        </Heading>
        <TextInput
          {...fields.email}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={disabled}
          keyboardType="email-address"
          marginBottom={1}
          maxLength={100}
          placeholder={formatMessage(emailMessages.emailPlaceholder)}
          returnKeyType="next"
        />
        <TextInput
          {...fields.password}
          disabled={disabled || forgetPasswordIsShown}
          marginBottom={1}
          maxLength={1000}
          placeholder={formatMessage(emailMessages.passwordPlaceholder)}
          returnKeyType="next"
          secureTextEntry
        />
        {!forgetPasswordIsShown
          ? <Box>
              <Buttons>
                <Button
                  bold
                  disabled={disabled}
                  onPress={this.onSignInViaPasswordPress}
                >
                  {formatMessage(buttonsMessages.signIn)}
                </Button>
                <Button bold disabled={disabled} onPress={this.onSignUpPress}>
                  {formatMessage(buttonsMessages.signUp)}
                </Button>
              </Buttons>
              <Box alignItems="flex-start">
                <Button
                  bold
                  disabled={disabled}
                  onPress={this.onForgetPasswordPress}
                >
                  {formatMessage(emailMessages.passwordForgotten)}
                </Button>
                {recoveryEmailSent &&
                  <Text bold color="success">
                    {formatMessage(emailMessages.recoveryEmailSent)}
                  </Text>}
              </Box>
            </Box>
          : <Buttons>
              <Button
                bold
                disabled={disabled}
                onPress={this.onResetPasswordPress}
              >
                {formatMessage(emailMessages.resetPassword)}
              </Button>
              <Button
                bold
                disabled={disabled}
                onPress={this.onForgetPasswordPress}
              >
                {formatMessage(buttonsMessages.dismiss)}
              </Button>
            </Buttons>}
      </Box>
    );
  }
}

export default compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
    }),
    { resetPassword, signIn, signUp },
  ),
  fields({
    path: ['auth', 'email'],
    fields: ['email', 'password'],
  }),
  injectIntl,
)(Email);
