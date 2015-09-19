import './login.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {focusInvalidField} from '../../common/lib/validation';

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
      .then(({error, payload}) => {
        if (error)
          focusInvalidField(this, payload);
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
