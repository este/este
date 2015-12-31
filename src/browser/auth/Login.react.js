import './Login.styl';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import focusInvalidField from '../lib/focusInvalidField';

export default class Login extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  async onFormSubmit(e) {
    e.preventDefault();
    const {actions, auth} = this.props;
    const result = await actions.login(auth.form.fields).payload.promise;
    if (result.error)
      focusInvalidField(this, result.payload);
    else
      this.redirectAfterLogin();
  }

  // TODO: Use redux-react-router.
  redirectAfterLogin() {
    const {history, location} = this.props;
    if (location.state && location.state.nextPathname)
      history.replaceState(null, location.state.nextPathname);
    else
      history.replaceState(null, '/');
  }

  render() {
    const {actions, auth: {form}, msg: {auth: {form: msg}}} = this.props;

    return (
      <div className="login">
        <Helmet title="Login" />
        <form onSubmit={e => this.onFormSubmit(e)}>
          <fieldset disabled={form.disabled}>
            <legend>{msg.legend}</legend>
            <input
              autoFocus
              name="email"
              onChange={actions.onAuthFormFieldChange}
              placeholder={msg.placeholder.email}
              value={form.fields.email}
            />
            <br />
            <input
              name="password"
              onChange={actions.onAuthFormFieldChange}
              placeholder={msg.placeholder.password}
              type="password"
              value={form.fields.password}
            />
            <br />
            <button
              children={msg.button.login}
              type="submit"
            />
            <span className="hint">{msg.hint}</span>
            {form.error &&
              <p className="error-message">{form.error.message}</p>
            }
          </fieldset>
        </form>
      </div>
    );
  }

}
