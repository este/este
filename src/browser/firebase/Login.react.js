import './Login.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { firebaseActions } from '../../common/lib/redux-firebase';

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
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
    const { auth, fields } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;

    return (
      <div className="firebase-login">
        <div className="social-auth-providers">
          <button
            data-provider="facebook"
            disabled={auth.formDisabled}
            onClick={this.onSocialLoginClick}
          >Facebook Login</button>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.formDisabled}>
            {!this.state.forgetPasswordIsShown ?
              <legend>Email Login / Sign Up</legend>
            :
              <legend>Email Password Recovery</legend>
            }
            <input
              maxLength="100"
              placeholder="your@email.com"
              {...fields.email}
            />
            {!forgetPasswordIsShown &&
              <input
                maxLength="1000"
                placeholder="password"
                type="password"
                {...fields.password}
              />
            }
            {!forgetPasswordIsShown ?
              <div className="buttons">
                <button>Login</button>
                <button onClick={this.onSignUpClick} type="button">Sign Up</button>
                <button
                  onClick={this.toggleForgetPassword}
                  type="button"
                >Forgot your password?</button>
                {recoveryEmailSent &&
                  <p>
                    <b>Recovery email has been sent.</b>
                  </p>
                }
              </div>
            :
              <div className="buttons">
                <button
                  onClick={this.onResetPasswordClick}
                  type="button"
                >Reset Password</button>
                <button
                  onClick={this.toggleForgetPassword}
                  type="button"
                >Dismiss</button>
              </div>
            }
          </fieldset>
        </form>
        {auth.formError &&
          <p className="error-message">{auth.formError.message}</p>
        }
      </div>
    );
  }

}

Login = fields(Login, {
  path: 'auth',
  fields: ['email', 'password']
});

export default connect(state => ({
  auth: state.auth
}), firebaseActions)(Login);
