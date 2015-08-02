import './login.styl';
import Component from '../components/component.react';
import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import {focusInvalidField} from '../lib/validation';

@exposeRouter
export default class Login extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    router: React.PropTypes.func
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {actions: {auth}, auth: {form}} = this.props;
    auth.login(form.fields)
      .then(() => this.redirectAfterLogin())
      .catch(focusInvalidField(this));
  }

  redirectAfterLogin() {
    const {router} = this.props;
    const nextPath = router.getCurrentQuery().nextPath;
    router.replaceWith(nextPath || 'home');
  }

  render() {
    const {
      actions: {auth: actions},
      auth: {form},
      msg: {auth: {form: msg}}
    } = this.props;

    return (
      <div className="login">
        <form onSubmit={::this.onFormSubmit}>
          <fieldset disabled={form.disabled}>
            <legend>{msg.legend}</legend>
            <input
              autoFocus
              name="email"
              onChange={actions.setFormField}
              placeholder={msg.placeholder.email}
              value={form.fields.email}
            />
            <br />
            <input
              name="password"
              onChange={actions.setFormField}
              placeholder={msg.placeholder.password}
              type="password"
              value={form.fields.password}
            />
            <br />
            <button
              children={msg.button.login}
              type="submit"
            />
            {form.error &&
              <span className="error-message">{form.error.message}</span>
            }
            <div>{msg.hint}</div>
          </fieldset>
        </form>
      </div>
    );
  }

}
