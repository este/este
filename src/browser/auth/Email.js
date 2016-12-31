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
import {
  Box,
  Button as DefaultButton,
  Form,
  Heading,
  Input,
  Message,
  focus,
} from '../app/components';

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
const overrideWebkitYellowAutofill = {
  WebkitBoxShadow: 'inset 0 0 0px 9999px white',
};

const Button = ({ ...props }) => (
  <DefaultButton
    border
    marginHorizontal={0.25}
    {...props}
  />
);

const Buttons = ({ ...props }) => (
  <Box
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
        <Heading marginTop={2}>
          <FormattedMessage {...legendMessage} />
        </Heading>
        <Box>
          <Input
            disabled={disabled}
            field={fields.email}
            maxLength={100}
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
            size={1}
            style={overrideWebkitYellowAutofill}
          />
          <Input
            disabled={forgetPasswordIsShown || disabled}
            field={fields.password}
            maxLength={1000}
            placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
            size={1}
            style={overrideWebkitYellowAutofill}
            type="password"
          />
        </Box>
        {!forgetPasswordIsShown ?
          <Box>
            <Buttons>
              <Button
                disabled={disabled}
                onClick={this.onSignInClick}
              >
                <FormattedMessage {...buttonsMessages.signIn} />
              </Button>
              <Button
                disabled={disabled}
                onClick={this.onSignUpClick}
              >
                <FormattedMessage {...buttonsMessages.signUp} />
              </Button>
              <Button
                disabled={disabled}
                onClick={this.onForgetPasswordClick}
              >
                <FormattedMessage {...emailMessages.passwordForgotten} />
              </Button>
            </Buttons>
            {recoveryEmailSent &&
              <Message success marginTop={1}>
                <FormattedMessage {...emailMessages.recoveryEmailSent} />
              </Message>
            }
          </Box>
        :
          <Buttons>
            <Button
              disabled={disabled}
              onClick={this.onResetPasswordClick}
            >
              <FormattedMessage {...emailMessages.resetPassword} />
            </Button>
            <Button
              disabled={disabled}
              onClick={this.onForgetPasswordClick}
            >
              <FormattedMessage {...buttonsMessages.dismiss} />
            </Button>
          </Buttons>
        }
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
