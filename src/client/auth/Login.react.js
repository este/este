import './Login.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import focusInvalidField from '../lib/focusInvalidField';

export default class Login extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {actions, auth: {form}} = this.props;
    actions.login(form.fields)
      .then(({error, payload: maybeValidationError}) => {
        if (error)
          focusInvalidField(this, maybeValidationError);
        else
          this.redirectAfterLogin();
      });
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
        <form onSubmit={e => this.onFormSubmit(e)}>
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
