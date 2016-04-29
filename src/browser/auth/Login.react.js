import './Login.scss';
import Component from 'react-pure-render/component';
import LoginError from './LoginError.react';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { browserHistory, locationShape } from 'react-router';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { focusInvalidField } from '../../common/lib/validation';
import { login } from '../../common/auth/actions';

const messages = defineMessages({
  formLegend: {
    defaultMessage: 'Classic XMLHttpRequest Login',
    id: 'auth.login.formLegend'
  },
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'auth.login.emailPlaceholder'
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'auth.login.passwordPlaceholder'
  },
  loginButton: {
    defaultMessage: 'Login',
    id: 'auth.login.loginButton'
  },
  hint: {
    defaultMessage: 'Hint: pass1',
    id: 'auth.login.hint'
  }
});

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    location: locationShape,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const { login, fields } = this.props;
    try {
      await login(fields.$values());
    } catch (error) {
      focusInvalidField(this, error.reason);
      return;
    }
    this.redirectAfterLogin();
  }

  redirectAfterLogin() {
    const { location } = this.props;
    const nextPathname = location.state && location.state.nextPathname || '/';
    browserHistory.replace(nextPathname);
  }

  render() {
    const { auth, fields } = this.props;
    const { intl } = this.props;
    const emailPlaceholder = intl.formatMessage(messages.emailPlaceholder);
    const passwordPlaceholder = intl.formatMessage(messages.passwordPlaceholder);

    return (
      <div className="login">
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.formDisabled}>
            <legend>
              <FormattedMessage {...messages.formLegend} />
            </legend>
            <input
              {...fields.email}
              maxLength="100"
              placeholder={emailPlaceholder}
            />
            <br />
            <input
              {...fields.password}
              maxLength="300"
              placeholder={passwordPlaceholder}
              type="password"
            />
            <br />
            <button type="submit">
              <FormattedMessage {...messages.loginButton} />
            </button>
            <span className="hint">
              <FormattedMessage {...messages.hint} />
            </span>
            <LoginError error={auth.formError} />
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

Login = injectIntl(Login);

export default connect(state => ({
  auth: state.auth
}), { login })(Login);
