import './Login.scss';
import * as authActions from '../../common/auth/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import focusInvalidField from '../lib/focusInvalidField';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { replace } from 'react-router-redux';

const messages = defineMessages({
  legend: {
    defaultMessage: 'Classic XMLHttpRequest Login',
    id: 'auth.login.legend'
  },
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'auth.login.emailPlaceholder'
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'auth.login.passwordPlaceholder'
  },
  login: {
    defaultMessage: 'Login',
    id: 'auth.login.login'
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
    location: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
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
    const { auth, fields } = this.props;
    const { intl } = this.props;
    const emailPlaceholder = intl.formatMessage(messages.emailPlaceholder);
    const passwordPlaceholder = intl.formatMessage(messages.passwordPlaceholder);

    return (
      <div className="login">
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.formDisabled}>
            <legend><FormattedMessage {...messages.legend} /></legend>
            <input
              maxLength="100"
              placeholder={emailPlaceholder}
              {...fields.email}
            />
            <br />
            <input
              maxLength="300"
              placeholder={passwordPlaceholder}
              type="password"
              {...fields.password}
            />
            <br />
            <button type="submit">
              <FormattedMessage {...messages.login} />
            </button>
            <span className="hint">
              <FormattedMessage {...messages.hint} />
            </span>
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

Login = injectIntl(Login);

export default connect(state => ({
  auth: state.auth
}), { ...authActions, replace })(Login);
