/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { resetPassword, signIn, signUp } from '../../common/lib/redux-firebase/actions';
import {
  ButtonOutline as Button,
  Form,
  Input,
  Message,
  Panel,
  PanelHeader,
  Space,
  View,
  focus,
} from '../app/components';

class Email extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    resetPassword: React.PropTypes.func.isRequired,
    signIn: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    // Note we are using the component state instead of the app state, because
    // the component state is the right place for an ephemeral UI state.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false,
    };
  }

  state: {
    forgetPasswordIsShown: boolean,
    recoveryEmailSent: boolean,
  };

  onFormSubmit() {
    if (this.state.forgetPasswordIsShown) {
      this.resetPassword();
    } else {
      this.signInViaPassword();
    }
  }

  onSignUpClick() {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  }

  onForgetPasswordClick() {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  }

  resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email, () => {
      this.setState({
        forgetPasswordIsShown: false,
        recoveryEmailSent: true,
      });
    });
  }

  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;

    return (
      <Form onSubmit={e => this.onFormSubmit(e)} small>
        <Panel theme="primary">
          <PanelHeader>
            <FormattedMessage {...legendMessage} />
          </PanelHeader>
          <Input
            {...fields.email}
            disabled={disabled}
            label=""
            maxLength={100}
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
          />
          {!forgetPasswordIsShown &&
            <Input
              {...fields.password}
              disabled={disabled}
              label=""
              maxLength={1000}
              placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
              type="password"
            />
          }
          {!forgetPasswordIsShown ?
            <View>
              <Button disabled={disabled}>
                <FormattedMessage {...buttonsMessages.signIn} />
              </Button>
              <Space />
              <Button
                disabled={disabled}
                onClick={() => this.onSignUpClick()}
                type="button"
              >
                <FormattedMessage {...buttonsMessages.signUp} />
              </Button>
              <Space />
              <Button
                disabled={disabled}
                onClick={() => this.onForgetPasswordClick()}
                type="button"
              >
                <FormattedMessage {...emailMessages.passwordForgotten} />
              </Button>
              {recoveryEmailSent &&
                <Message>
                  <FormattedMessage {...emailMessages.recoveryEmailSent} />
                </Message>
              }
            </View>
          :
            <View>
              <Button disabled={disabled}>
                <FormattedMessage {...emailMessages.resetPassword} />
              </Button>
              <Space />
              <Button
                disabled={disabled}
                onClick={() => this.onForgetPasswordClick()}
                type="button"
              >
                <FormattedMessage {...buttonsMessages.dismiss} />
              </Button>
            </View>
          }
        </Panel>
      </Form>
    );
  }

}

Email = focus(Email, 'error');

Email = injectIntl(Email);

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(state => ({
  disabled: state.auth.formDisabled,
  error: state.auth.error,
}), { resetPassword, signIn, signUp })(Email);
