import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { focus } from '../app/components';
import { resetPassword, signIn, signUp } from '../../common/lib/redux-firebase/actions';

class Email extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    resetPassword: React.PropTypes.func.isRequired,
    signIn: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    // Note we are using the component state instead of the app state, because
    // the component state is the right place for an ephemeral UI state.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false,
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.forgetPasswordIsShown) {
      this.resetPassword();
    } else {
      this.signInViaPassword();
    }
  }

  onSignUpClick() {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  }

  onForgetPasswordClick() {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  }

  resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email, () => {
      this.setState({
        forgetPasswordIsShown: false,
        recoveryEmailSent: true,
      });
    });
  }

  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;

    return (
      <form className="email" onSubmit={e => this.onFormSubmit(e)}>
        <fieldset disabled={disabled}>
          <legend>
            <FormattedMessage {...legendMessage} />
          </legend>
          <input
            {...fields.email}
            maxLength={100}
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
          />
          {!forgetPasswordIsShown &&
            <input
              {...fields.password}
              maxLength={1000}
              placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
              type="password"
            />
          }
          {!forgetPasswordIsShown ?
            <div className="buttons">
              <button>
                <FormattedMessage {...buttonsMessages.signIn} />
              </button>
              <button onClick={() => this.onSignUpClick()} type="button">
                <FormattedMessage {...buttonsMessages.signUp} />
              </button>
              <button
                onClick={() => this.onForgetPasswordClick()}
                type="button"
              >
                <FormattedMessage {...emailMessages.passwordForgotten} />
              </button>
              {recoveryEmailSent &&
                <p>
                  <FormattedMessage {...emailMessages.recoveryEmailSent} />
                </p>
              }
            </div>
          :
            <div className="buttons">
              <button>
                <FormattedMessage {...emailMessages.resetPassword} />
              </button>
              <button
                onClick={this.onForgetPasswordClick}
                type="button"
              ><FormattedMessage {...buttonsMessages.dismiss} /></button>
            </div>
          }
        </fieldset>
      </form>
    );
  }

}

Email = focus(Email, 'error');

Email = injectIntl(Email);

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(state => ({
  disabled: state.auth.formDisabled,
  error: state.auth.error,
}), { resetPassword, signIn, signUp })(Email);
