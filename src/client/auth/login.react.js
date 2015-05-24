import * as actions from './actions';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import immutable from 'immutable';
import {focusInvalidField} from '../../lib/validation';
import {msg} from '../intl/store';

require('./login.styl');

class Login extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  getForm() {
    return this.props.auth.get('form');
  }

  onFormSubmit(e) {
    e.preventDefault();
    const fields = this.getForm().fields.toJS();
    actions.login(fields)
      .then(() => {
        this.redirectAfterLogin();
      })
      .catch(focusInvalidField(this));
  }

  redirectAfterLogin() {
    const nextPath = this.props.router.getCurrentQuery().nextPath;
    this.props.router.replaceWith(nextPath || '/');
  }

  render() {
    const form = this.getForm();

    return (
      <DocumentTitle title={msg('auth.title')}>
        <div className="login">
          <form onSubmit={this.onFormSubmit}>
            <fieldset disabled={actions.login.pending}>
              <legend>{msg('auth.form.legend')}</legend>
              <input
                autoFocus
                name="email"
                onChange={actions.updateFormField}
                placeholder={msg('auth.form.placeholder.email')}
                value={form.fields.email}
              />
              <br />
              <input
                name="password"
                onChange={actions.updateFormField}
                placeholder={msg('auth.form.placeholder.password')}
                type="password"
                value={form.fields.password}
              />
              <br />
              <button
                children={msg('auth.form.button.login')}
                disabled={actions.login.pending}
                type="submit"
              />
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
  auth: React.PropTypes.instanceOf(immutable.Map).isRequired,
  router: React.PropTypes.func
};

export default exposeRouter(Login);
