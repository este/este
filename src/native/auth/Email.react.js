import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import ValidationError from '../../common/lib/validation/ValidationError';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import theme from '../../common/app/theme';
import { FormattedMessage, Button, TextInput } from '../app/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';
import { resetPassword, signIn, signUp } from '../../common/lib/redux-firebase/actions';

const styles = StyleSheet.create({
  legend: {
    fontSize: theme.fontSizeH4,
    marginVertical: theme.fontSize * 2,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: theme.fontSize * 2,
  },
  recoveryEmailSent: {
    color: theme.brandInfo,
  },
});

class Email extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    fields: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    resetPassword: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };

  constructor() {
    super();
    this.onForgetPasswordPress = this.onForgetPasswordPress.bind(this);
    this.onResetPasswordPress = this.onResetPasswordPress.bind(this);
    this.onSignInViaPasswordPress = this.onSignInViaPasswordPress.bind(this);
    this.onSignUpPress = this.onSignUpPress.bind(this);
    // Note we are using the component state instead of the app state, because
    // the component state is the right place for an ephemeral UI state.
    this.state = {
      forgetPasswordIsShown: false,
      recoveryEmailSent: false,
    };
  }

  async onSignInViaPasswordPress() {
    const { fields, signIn } = this.props;
    try {
      await signIn('password', fields.$values());
    } catch (error) {
      if (error instanceof ValidationError) return;
      throw error;
    }
  }

  async onSignUpPress() {
    const { fields, signUp } = this.props;
    try {
      await signUp('password', fields.$values());
    } catch (error) {
      if (error instanceof ValidationError) return;
      throw error;
    }
  }

  onForgetPasswordPress() {
    const { forgetPasswordIsShown } = this.state;
    this.setState({ forgetPasswordIsShown: !forgetPasswordIsShown });
  }

  async onResetPasswordPress() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    try {
      await resetPassword(email);
    } catch (error) {
      if (error instanceof ValidationError) return;
      throw error;
    }
    this.setState({
      forgetPasswordIsShown: false,
      recoveryEmailSent: true,
    });
  }

  render() {
    const { disabled, error, fields, intl, style } = this.props;
    const { forgetPasswordIsShown, recoveryEmailSent } = this.state;
    const legendMessage = forgetPasswordIsShown
      ? emailMessages.passwordRecoveryLegend
      : emailMessages.emailLegend;

    return (
      <View style={style}>
        <FormattedMessage {...legendMessage} style={styles.legend} />
        <TextInput
          {...fields.email}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          invalid={ValidationError.isInvalid(error, 'email')}
          maxLength={100}
          placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
        />
        {!forgetPasswordIsShown &&
          <TextInput
            {...fields.password}
            editable={!disabled}
            invalid={ValidationError.isInvalid(error, 'password')}
            maxLength={1000}
            placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
            secureTextEntry
          />
        }
        {!forgetPasswordIsShown ?
          <View>
            <View style={styles.buttons}>
              <Button disabled={disabled} onPress={this.onSignInViaPasswordPress}>
                <FormattedMessage {...buttonsMessages.signIn} />
              </Button>
              <Button disabled={disabled} onPress={this.onSignUpPress}>
                <FormattedMessage {...buttonsMessages.signUp} />
              </Button>
              <Button disabled={disabled} onPress={this.onForgetPasswordPress}>
                <FormattedMessage {...emailMessages.passwordForgotten} />
              </Button>
            </View>
            {recoveryEmailSent &&
              <FormattedMessage
                {...emailMessages.recoveryEmailSent}
                style={styles.recoveryEmailSent}
              />
            }
          </View>
        :
          <View style={styles.buttons}>
            <Button disabled={disabled} onPress={this.onResetPasswordPress}>
              <FormattedMessage {...emailMessages.resetPassword} />
            </Button>
            <Button disabled={disabled} onPress={this.onForgetPasswordPress}>
              <FormattedMessage {...buttonsMessages.dismiss} />
            </Button>
          </View>
        }
      </View>
    );
  }

}

Email = injectIntl(Email);

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(state => ({
  disabled: state.auth.formDisabled,
  error: state.auth.error,
}), { resetPassword, signIn, signUp })(Email);
