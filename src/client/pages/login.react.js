import DocumentTitle from 'react-document-title';
import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import {focusInvalidField} from '../../lib/validation';
import {getForm} from '../auth/store';
import {msg} from '../intl/store';
import {updateFormField, login} from '../auth/actions';

require('./login.styl');

class Login extends React.Component {

  onFormSubmit(e) {
    e.preventDefault();
    const fields = getForm().toJS().fields;
    login(fields)
      .then(() => {
        this.redirectAfterLogin();
      })
      .catch(focusInvalidField(this));
  }

  redirectAfterLogin() {
    // TODO: Probably use hard reload for Chrome to remember password.
    // https://code.google.com/p/chromium/issues/detail?id=43219#c56
    const nextPath = this.props.router.getCurrentQuery().nextPath;
    this.props.router.replaceWith(nextPath || '/');
  }

  render() {
    const form = getForm().toJS();

    return (
      <DocumentTitle title={msg('auth.title')}>
        <div className="login">
          <form onSubmit={(e) => this.onFormSubmit(e)}>
            <fieldset>
              <legend>{msg('auth.form.legend')}</legend>
              <input
                autoFocus="true"
                disabled={login.pending}
                name="email"
                onChange={updateFormField}
                placeholder={msg('auth.form.placeholder.email')}
                value={form.fields.email}
                /><br />
              <input
                disabled={login.pending}
                name="password"
                onChange={updateFormField}
                placeholder={msg('auth.form.placeholder.password')}
                type="password"
                value={form.fields.password}
                /><br />
              <button
                disabled={login.pending}
                type="submit"
                >{msg('auth.form.button.login')}</button>
              {/*
               <button type="submit">{msg('auth.form.button.signup')}</button>
               */}
              {form.error &&
              <span className="error-message">{form.error.message}</span>
              }
              <div>{msg('auth.form.hint')}</div>
            </fieldset>
          </form>
        </div>
      </DocumentTitle>
    );
  }

}

Login.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(Login);
