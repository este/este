import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
// import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import theme from '../app/theme';
// import { Button } from '../app/components';
import { Text } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { resetPassword, signIn, signUp } from '../../common/lib/redux-firebase/actions';

const styles = StyleSheet.create({
  input: {
    height: theme.fontSizeH5,
    marginBottom: theme.fontSizeBase * .5,
    marginTop: theme.fontSizeBase * .5,
  },
  legend: {
    fontSize: theme.fontSizeH3,
  },
});

class Email extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    resetPassword: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };

  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onForgetPasswordClick = this.onForgetPasswordClick.bind(this);
    // Note we are using the component state instead of the app state, because
    // the component state is the right place for an ephemeral UI state.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false,
    };
  }

  onFormSubmit() {
    // e.preventDefault();
    // if (this.state.forgetPasswordIsShown) {
    //   this.resetPassword();
    // } else {
    //   this.signInViaPassword();
    // }
  }

  async onSignUpClick() {
    // const { fields, signUp } = this.props;
    // try {
    //   await signUp('password', fields.$values());
    // } catch (error) {
    //   if (error instanceof ValidationError) {
    //     focusInvalidField(this, error);
    //     return;
    //   }
    //   throw error;
    // }
  }

  onForgetPasswordClick() {
    // const { forgetPasswordIsShown } = this.state;
    // this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  }

  async resetPassword() {
    // const { fields, resetPassword } = this.props;
    // const { email } = fields.$values();
    // try {
    //   await resetPassword(email);
    // } catch (error) {
    //   if (error instanceof ValidationError) {
    //     focusInvalidField(this, error);
    //     return;
    //   }
    //   throw error;
    // }
    // this.setState({
    //   forgetPasswordIsShown: false,
    //   recoveryEmailSent: true
    // });
  }

  async signInViaPassword() {
    // const { fields, signIn } = this.props;
    // try {
    //   await signIn('password', fields.$values());
    // } catch (error) {
    //   if (error instanceof ValidationError) {
    //     focusInvalidField(this, error);
    //     return;
    //   }
    //   throw error;
    // }
  }

  render() {
    const { fields, style } = this.props;
    const { forgetPasswordIsShown } = this.state;
    // const legendMessage = forgetPasswordIsShown
    //   ? emailMessages.passwordRecoveryLegend
    //   : emailMessages.emailLegend;

    return (
      <View style={style}>
        <Text style={styles.legend}>Email</Text>
        <FormattedMessage {...emailMessages.emailPlaceholder}>
          {placeholder =>
            <TextInput
              {...fields.email}
              maxLength={100}
              placeholder={placeholder}
              placeholderTextColor={theme.lighten(theme.textColor)}
              style={styles.input}
            />
          }
        </FormattedMessage>
        {!forgetPasswordIsShown &&
          <FormattedMessage {...emailMessages.passwordPlaceholder}>
            {placeholder =>
              <TextInput
                {...fields.password}
                maxLength={1000}
                placeholder={placeholder}
                placeholderTextColor={theme.lighten(theme.textColor)}
                secureTextEntry
                style={styles.input}
              />
            }
          </FormattedMessage>
        }
      </View>
    );

    //       {!forgetPasswordIsShown ?
    //         <div className="buttons">
    //           <button>
    //             <FormattedMessage {...buttonsMessages.signIn} />
    //           </button>
    //           <button onClick={this.onSignUpClick} type="button">
    //             <FormattedMessage {...buttonsMessages.signUp} />
    //           </button>
    //           <button
    //             onClick={this.onForgetPasswordClick}
    //             type="button"
    //           >
    //             <FormattedMessage {...emailMessages.passwordForgotten} />
    //           </button>
    //           {recoveryEmailSent &&
    //             <p>
    //               <FormattedMessage {...emailMessages.recoveryEmailSent} />
    //             </p>
    //           }
    //         </div>
    //       :
    //         <div className="buttons">
    //           <button>
    //             <FormattedMessage {...emailMessages.resetPassword} />
    //           </button>
    //           <button
    //             onClick={this.onForgetPasswordClick}
    //             type="button"
    //           ><FormattedMessage {...buttonsMessages.dismiss} /></button>
    //         </div>
    //       }
    //     </fieldset>
    //   </form>
    // );
  }

}

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(state => ({
  disabled: state.auth.formDisabled,
}), { resetPassword, signIn, signUp })(Email);
