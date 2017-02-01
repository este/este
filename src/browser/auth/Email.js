// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { resetPassword, signIn, signUp } from '../../common/auth/actions';
import { Form, focus } from '../components';
import {
  Box,
  Heading,
  Message,
  OutlineButton,
  TextInput,
} from '../../common/components';

type EmailState = {
  forgetPasswordIsShown: boolean,
  recoveryEmailSent: boolean,
};

type EmailProps = {
  disabled: boolean,
  fields: any,
  intl: $IntlShape,
  resetPassword: typeof resetPassword,
  signIn: typeof signIn,
  signUp: typeof signUp,
};

// blog.mariusschulz.com/2016/03/20/how-to-remove-webkits-banana-yellow-autofill-background
const overrideWebkitYellowAutofill = () => ({
  WebkitBoxShadow: 'inset 0 0 0px 9999px white',
});

const Button = ({ message, ...props }) => (
  <FormattedMessage {...message}>
    {msg => (
      <OutlineButton marginHorizontal={0.25} {...props}>
        {msg}
      </OutlineButton>
    )}
  </FormattedMessage>
);

const Buttons = props => (
  <Box
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={1}
    marginHorizontal={-0.25}
    {...props}
  />
);

class Email extends React.Component {
  state: EmailState = {
    forgetPasswordIsShown: false,
    recoveryEmailSent: false,
  };

  onFormSubmit = () => {
    if (this.state.forgetPasswordIsShown) {
      this.resetPassword();
    } else {
      this.signInViaPassword();
    }
  };

  onSignInClick = () => {
    this.signInViaPassword();
  };

  onSignUpClick = () => {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  };

  onForgetPasswordClick = () => {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  };

  onResetPasswordClick = () => {
    this.resetPassword();
  };

  props: EmailProps;

  resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email);
    this.setState({
      forgetPasswordIsShown: false,
      recoveryEmailSent: true,
    });
  }

  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Box marginTop={1}>
          <Heading size={1}>
            {intl.formatMessage(legendMessage)}
          </Heading>
          <TextInput
            {...fields.email}
            disabled={disabled}
            marginBottom={1}
            maxLength={100}
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
            size={1}
            style={overrideWebkitYellowAutofill}
          />
          <TextInput
            {...fields.password}
            disabled={forgetPasswordIsShown || disabled}
            maxLength={1000}
            placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
            size={1}
            style={overrideWebkitYellowAutofill}
            type="password"
          />
        </Box>
        {!forgetPasswordIsShown
          ? <Box>
              <Buttons>
                <Button
                  disabled={disabled}
                  message={buttonsMessages.signIn}
                  onClick={this.onSignInClick}
                />
                <Button
                  disabled={disabled}
                  message={buttonsMessages.signUp}
                  onClick={this.onSignUpClick}
                />
                <Button
                  disabled={disabled}
                  message={emailMessages.passwordForgotten}
                  onClick={this.onForgetPasswordClick}
                />
              </Buttons>
              {recoveryEmailSent &&
                <FormattedMessage {...emailMessages.recoveryEmailSent}>
                  {message => (
                    <Message backgroundColor="success" marginTop={1}>
                      {message}
                    </Message>
                  )}
                </FormattedMessage>}
            </Box>
          : <Buttons>
              <Button
                disabled={disabled}
                message={emailMessages.resetPassword}
                onClick={this.onResetPasswordClick}
              />
              <Button
                disabled={disabled}
                message={buttonsMessages.dismiss}
                onClick={this.onForgetPasswordClick}
              />
            </Buttons>}
      </Form>
    );
  }
}

export default compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    { resetPassword, signIn, signUp },
  ),
  injectIntl,
  fields({
    path: ['auth', 'email'],
    fields: ['email', 'password'],
  }),
  focus('error'),
)(Email);
