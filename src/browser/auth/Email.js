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
  Button,
  Form,
  Heading,
  Input,
  Text,
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

  onSignUpClick = () => {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  };

  onForgetPasswordClick = () => {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
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
        <Heading marginTop={2} size={1}>
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
            <Button
              disabled={disabled}
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
            {recoveryEmailSent &&
              <Text success>
                <FormattedMessage {...emailMessages.recoveryEmailSent} />
              </Text>
            }
          </Box>
        :
          <Box>
            <Button
              disabled={disabled}
            >
              <FormattedMessage {...emailMessages.resetPassword} />
            </Button>
            <Button
              disabled={disabled}
              onClick={this.onForgetPasswordClick}
            >
              <FormattedMessage {...buttonsMessages.dismiss} />
            </Button>
          </Box>
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
