import './Login.styl';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import focusInvalidField from '../lib/focusInvalidField';

export default class Login extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    // Read why we bind event handlers explicitly.
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const {actions, auth} = this.props;
    const result = await actions.login(auth.form.fields).payload.promise;
    if (result.error) {
      focusInvalidField(this, result.payload);
      return;
    }
    this.redirectAfterLogin();
  }

  redirectAfterLogin() {
    const {location} = this.props;
    const nextPathname = location.state && location.state.nextPathname || '/';
    this.context.router.replace(nextPathname);
  }

  render() {
    const {actions, auth, msg} = this.props;

    return (
      <div className="login">
        <Helmet title="Login" />
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.form.disabled}>
            <legend>{msg.auth.form.legend}</legend>
            <input
              autoFocus
              name="email"
              onChange={actions.onAuthFormFieldChange}
              placeholder={msg.auth.form.placeholder.email}
              value={auth.form.fields.email}
            />
            <br />
            <input
              name="password"
              onChange={actions.onAuthFormFieldChange}
              placeholder={msg.auth.form.placeholder.password}
              type="password"
              value={auth.form.fields.password}
            />
            <br />
            <button
              children={msg.auth.form.button.login}
              type="submit"
            />
            <span className="hint">{msg.auth.form.hint}</span>
            {auth.form.error &&
              <p className="error-message">{auth.form.error.message}</p>
            }
          </fieldset>
        </form>
      </div>
    );
  }

}
