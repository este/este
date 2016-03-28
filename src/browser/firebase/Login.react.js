import './Login.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { firebaseActions } from '../../common/lib/redux-firebase';

const messages = defineMessages({
  facebookLogin: {
    defaultMessage: 'Facebook Login',
    id: 'firebase.login.facebookLogin'
  },
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
  loginButton: {
    defaultMessage: 'Login',
    id: 'firebase.login.loginButton'
  },
  signUp: {
    defaultMessage: 'Sign Up',
    id: 'firebase.login.signUp'
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
  dismiss: {
    defaultMessage: 'Dismiss',
    id: 'firebase.login.dismiss'
  },
  authenticationProviderDisabled: {
    id: 'firebase.error.authenticationProviderDisabled',
    defaultMessage: 'The requested authentication provider is disabled for this Firebase.'
  },
  dataStale: {
    id: 'firebase.error.dataStale',
    defaultMessage: 'Internal use.'
  },
  deniedByUser: {
    id: 'firebase.error.deniedByUser',
    defaultMessage: 'The user did not authorize the application.'
  },
  disconnected: {
    id: 'firebase.error.disconnected',
    defaultMessage: 'The operation had to be aborted due to a network disconnect.'
  },
  emailTaken: {
    id: 'firebase.error.emailTaken',
    defaultMessage: `The new user account cannot be created because the
      specified email address is already in use.`
  },
  expiredToken: {
    id: 'firebase.error.expiredToken',
    defaultMessage: 'The supplied auth token has expired.'
  },
  invalidAuthArguments: {
    id: 'firebase.error.invalidAuthArguments',
    defaultMessage: 'The specified credentials are malformed or incomplete.'
  },
  invalidConfiguration: {
    id: 'firebase.error.invalidConfiguration',
    defaultMessage: `The requested authentication provider is misconfigured, and
      the request cannot complete.`
  },
  invalidCredentials: {
    id: 'firebase.error.invalidCredentials',
    defaultMessage: 'The specified authentication credentials are invalid.'
  },
  invalidEmail: {
    id: 'firebase.error.invalidEmail',
    defaultMessage: 'The specified email is not a valid email.'
  },
  invalidPassword: {
    id: 'firebase.error.invalidPassword',
    defaultMessage: 'The specified user account password is incorrect.'
  },
  invalidProvider: {
    id: 'firebase.error.invalidProvider',
    defaultMessage: 'The requested authentication provider does not exist.'
  },
  invalidToken: {
    id: 'firebase.error.invalidToken',
    defaultMessage: 'The specified authentication token is invalid.'
  },
  limitsExceeded: {
    id: 'firebase.error.limitsExceeded',
    defaultMessage: 'Limits exceeded.'
  },
  maxRetries: {
    id: 'firebase.error.maxRetries',
    defaultMessage: 'The transaction had too many retries.'
  },
  networkError: {
    id: 'firebase.error.networkError',
    defaultMessage: 'The operation could not be performed due to a network error.'
  },
  operationFailed: {
    id: 'firebase.error.operationFailed',
    defaultMessage: 'The server indicated that this operation failed.'
  },
  overriddenBySet: {
    id: 'firebase.error.overriddenBySet',
    defaultMessage: 'The transaction was overridden by a subsequent set.'
  },
  permissionDenied: {
    id: 'firebase.error.permissionDenied',
    defaultMessage: 'This client does not have permission to perform this operation.'
  },
  preempted: {
    id: 'firebase.error.preempted',
    defaultMessage: `The active or pending auth credentials were superseded by
      another call to auth.`
  },
  providerError: {
    id: 'firebase.error.providerError',
    defaultMessage: 'A third-party provider error occurred.'
  },
  unavailable: {
    id: 'firebase.error.unavailable',
    defaultMessage: 'The service is unavailable.'
  },
  unknownError: {
    id: 'firebase.error.unknownError',
    defaultMessage: 'An unknown error occurred.'
  },
  userCancelled: {
    id: 'firebase.error.userCancelled',
    defaultMessage: 'The user cancelled authentication.'
  },
  userCodeException: {
    id: 'firebase.error.userCodeException',
    defaultMessage: 'An exception occurred in user code.'
  },
  userDoesNotExist: {
    id: 'firebase.error.userDoesNotExist',
    defaultMessage: 'The specified user account does not exist.'
  },
  writeCanceled: {
    id: 'firebase.error.writeCanceled',
    defaultMessage: 'The write was canceled locally.'
  }
});

// Maps upper snake cased error code to camel case
// e.g: INVALID_EMAIL -> invalidEmail
const mapFirebaseCodeToMessageDescriptorKey = code =>
  code.toLowerCase()
    .replace(/(_.)/g, (x) => x[1].toUpperCase());

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    login: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onSocialLoginClick = this.onSocialLoginClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.toggleForgetPassword = this.toggleForgetPassword.bind(this);
    this.onResetPasswordClick = this.onResetPasswordClick.bind(this);
    // Note we deliberately use component state, because we don't want to
    // preserve this piece of state when the user leaves a page.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false
    };
  }

  onSocialLoginClick(e) {
    const { provider } = e.target.dataset;
    const { fields, login } = this.props;
    login(provider, fields.$values());
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { fields, login } = this.props;
    login('password', fields.$values());
  }

  onSignUpClick() {
    const { fields, signUp } = this.props;
    signUp(fields.$values());
  }

  async onResetPasswordClick() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    const result = await resetPassword(email).payload.promise;
    if (result.error) return;
    this.setState({
      forgetPasswordIsShown: false,
      recoveryEmailSent: true
    });
  }

  toggleForgetPassword() {
    this.setState(({ forgetPasswordIsShown }) => ({
      forgetPasswordIsShown: !forgetPasswordIsShown
    }));
  }

  render() {
    const { auth: { formDisabled, formError }, fields } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const { intl } = this.props;
    const emailPlaceholder = intl.formatMessage(messages.emailPlaceholder);
    const passwordPlaceholder = intl.formatMessage(messages.passwordPlaceholder);

    // Breaks login if <FormattedMessage /> is used inside button.
    // This could be fixed with React 15 (no generated span's)
    const facebookLogin = intl.formatMessage(messages.facebookLogin);

    const firebaseErrorKey = formError &&
      mapFirebaseCodeToMessageDescriptorKey(formError.code);

    return (
      <div className="firebase-login">
        <div className="social-auth-providers">
          <button
            data-provider="facebook"
            disabled={formDisabled}
            onClick={this.onSocialLoginClick}
          >
            {facebookLogin}
          </button>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={formDisabled}>
            {!this.state.forgetPasswordIsShown ?
              <legend><FormattedMessage {...messages.emailLoginOrSignUp} /></legend>
            :
              <legend><FormattedMessage {...messages.emailPasswordRecovery} /></legend>
            }
            <input
              maxLength="100"
              placeholder={emailPlaceholder}
              {...fields.email}
            />
            {!forgetPasswordIsShown &&
              <input
                maxLength="1000"
                placeholder={passwordPlaceholder}
                type="password"
                {...fields.password}
              />
            }
            {!forgetPasswordIsShown ?
              <div className="buttons">
                <button>
                  <FormattedMessage {...messages.loginButton} />
                </button>
                <button onClick={this.onSignUpClick} type="button">
                  <FormattedMessage {...messages.signUp} />
                </button>
                <button
                  onClick={this.toggleForgetPassword}
                  type="button"
                >
                  <FormattedMessage {...messages.passwordForgotten} />
                </button>
                {recoveryEmailSent &&
                  <p>
                    <b><FormattedMessage {...messages.recoveryEmailSent} /></b>
                  </p>
                }
              </div>
            :
              <div className="buttons">
                <button
                  onClick={this.onResetPasswordClick}
                  type="button"
                ><FormattedMessage {...messages.resetPassword} />
                </button>
                <button
                  onClick={this.toggleForgetPassword}
                  type="button"
                ><FormattedMessage {...messages.dismiss} /></button>
              </div>
            }
          </fieldset>
        </form>
        {formError &&
          <p className="error-message">
            <FormattedMessage {...messages[firebaseErrorKey]} />
          </p>
        }
      </div>
    );
  }

}

Login = fields(Login, {
  path: 'auth',
  fields: ['email', 'password']
});

Login = injectIntl(Login);

export default connect(state => ({
  auth: state.auth
}), firebaseActions)(Login);
