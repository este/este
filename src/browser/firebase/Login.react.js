import './Login.scss';
import * as firebaseActions from '../../common/lib/redux-firebase/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fields} from '../../common/lib/redux-fields';

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSocialLoginClick = this.onSocialLoginClick.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {fields, login} = this.props;
    login('password', fields.$values());
  }

  onSocialLoginClick(e) {
    const {provider} = e.target.dataset;
    const {fields, login} = this.props;
    login(provider, fields.$values());
  }

  signUp() {
    const {fields, signUp} = this.props;
    signUp(fields.$values());
  }

  render() {
    const {auth, fields} = this.props;

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
            <legend>Email Login / Sign Up</legend>
            <input
              autoFocus
              maxLength="100"
              placeholder="your@email.com"
              {...fields.email}
            />
            <br />
            <input
              maxLength="1000"
              placeholder="password"
              type="password"
              {...fields.password}
            />
            <br />
            <button>Login</button>
            <button onClick={this.signUp} type="button">Sign Up</button>
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
