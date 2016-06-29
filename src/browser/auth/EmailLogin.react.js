import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage, defineMessages } from 'react-intl';
import { ValidationError, focusInvalidField } from '../../common/lib/validation';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { firebaseActions } from '../../common/lib/redux-firebase';

const messages = defineMessages({
  emailLoginOrSignUp: {
    defaultMessage: 'Email Login / Sign Up',
    id: 'firebase.login.emailLoginOrSignUp'
  },
  emailPasswordRecovery: {
    defaultMessage: 'Email Password Recovery',
    id: 'firebase.login.emailPasswordRecovery'
  },
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'firebase.login.emailPlaceholder'
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'firebase.login.passwordPlaceholder'
  },
  passwordForgotten: {
    defaultMessage: 'Forgot your password?',
    id: 'firebase.login.passwordForgotten'
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'firebase.login.recoveryEmailSent'
  },
  resetPassword: {
    defaultMessage: 'Reset Password',
    id: 'firebase.login.resetPassword'
  },
});


class EmailLogin extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onForgetPasswordClick = this.onForgetPasswordClick.bind(this);
    // Remember the component state is preserved only for shown components.
    // We don't want to preserve forgetPasswordIsShown nor recoveryEmailSent.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.forgetPasswordIsShown) {
      this.resetPassword();
    } else {
      this.loginViaPassword();
    }
  }

  async onSignUpClick() {
    const { fields, signUp } = this.props;
    try {
      await signUp(fields.$values());
    } catch (error) {
      const { reason } = error;
      if (reason instanceof ValidationError) {
        focusInvalidField(this, reason);
        return;
      }
      throw error;
    }
  }

  onForgetPasswordClick() {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  }

  async resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    try {
      await resetPassword(email);
    } catch (error) {
      const { reason } = error;
      if (reason instanceof ValidationError) {
        focusInvalidField(this, reason);
        return;
      }
      throw error;
    }
    this.setState({
      forgetPasswordIsShown: false,
      recoveryEmailSent: true
    });
  }

  async loginViaPassword() {
    const { fields, login } = this.props;
    try {
      await login('password', fields.$values());
    } catch (error) {
      const { reason } = error;
      if (reason instanceof ValidationError) {
        focusInvalidField(this, reason);
        return;
      }
      throw error;
    }
  }

  render() {
    const { disabled, fields } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? messages.emailPasswordRecovery
      : messages.emailLoginOrSignUp;

    return (
      <form className="email-login" onSubmit={this.onFormSubmit}>
        <fieldset disabled={disabled}>
          <legend>
            <FormattedMessage {...legendMessage} />
          </legend>
          <FormattedMessage {...messages.emailPlaceholder}>
            {message => <input
              {...fields.email}
              maxLength="100"
              placeholder={message}
            />}
          </FormattedMessage>
          {!forgetPasswordIsShown &&
            <FormattedMessage {...messages.passwordPlaceholder}>
              {message => <input
                {...fields.password}
                maxLength="1000"
                placeholder={message}
                type="password"
              />}
            </FormattedMessage>
          }
          {!forgetPasswordIsShown ?
            <div className="buttons">
              <button>
                <FormattedMessage {...buttonsMessages.login} />
              </button>
              <button onClick={this.onSignUpClick} type="button">
                <FormattedMessage {...buttonsMessages.signUp} />
              </button>
              <button
                onClick={this.onForgetPasswordClick}
                type="button"
              >
                <FormattedMessage {...messages.passwordForgotten} />
              </button>
              {recoveryEmailSent &&
                <p>
                  <FormattedMessage {...messages.recoveryEmailSent} />
                </p>
              }
            </div>
          :
            <div className="buttons">
              <button>
                <FormattedMessage {...messages.resetPassword} />
              </button>
              <button
                onClick={this.onForgetPasswordClick}
                type="button"
              ><FormattedMessage {...buttonsMessages.dismiss} /></button>
            </div>
          }
        </fieldset>
      </form>
    );
  }

}

EmailLogin = fields(EmailLogin, {
  path: 'auth',
  fields: ['email', 'password']
});

export default connect(state => ({
  disabled: state.auth.formDisabled
}), firebaseActions)(EmailLogin);
