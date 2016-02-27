import './Login.scss';
import * as authActions from '../../common/auth/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import focusInvalidField from '../lib/focusInvalidField';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { replace } from 'react-router-redux';

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    // Read why we bind event handlers explicitly.
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const { login, fields } = this.props;
    const result = await login(fields.$values()).payload.promise;
    if (result.error) {
      focusInvalidField(this, result.payload);
      return;
    }
    this.redirectAfterLogin();
  }

  redirectAfterLogin() {
    const { location, replace } = this.props;
    const nextPathname = location.state && location.state.nextPathname || '/';
    replace(nextPathname);
  }

  render() {
    const { auth, fields, msg } = this.props;

    return (
      <div className="login">
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.formDisabled}>
            <legend>{msg.legend}</legend>
            <input
              maxLength="100"
              placeholder={msg.placeholder.email}
              {...fields.email}
            />
            <br />
            <input
              maxLength="300"
              placeholder={msg.placeholder.password}
              type="password"
              {...fields.password}
            />
            <br />
            <button type="submit">{msg.button.login}</button>
            <span className="hint">{msg.hint}</span>
            {auth.formError &&
              <p className="error-message">{auth.formError.message}</p>
            }
          </fieldset>
        </form>
      </div>
    );
  }

}

Login = fields(Login, {
  path: 'auth',
  fields: ['email', 'password']
});

export default connect(state => ({
  auth: state.auth,
  msg: state.intl.msg.auth.form
}), { ...authActions, replace })(Login);
