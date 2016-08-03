import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component, PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from '../app/components';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { nativeSignIn } from '../../common/lib/redux-firebase/actions';

const SocialLoginButton = ({ backgroundColor, message, name, onPress }) =>
  <FormattedMessage {...message}>
    {message =>
      <Icon.Button
        backgroundColor={backgroundColor}
        name={name}
        onPress={onPress}
      >{message}</Icon.Button>
    }
  </FormattedMessage>;

SocialLoginButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

class Social extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    nativeSignIn: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };

  constructor() {
    super();
    this.onFacebookLoginPress = this.onFacebookLoginPress.bind(this);
  }

  onFacebookLoginPress() {
    const { disabled, nativeSignIn } = this.props;
    if (disabled) return;
    nativeSignIn('facebook');
  }

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <SocialLoginButton
          backgroundColor="#3b5998"
          message={buttonsMessages.facebookSignIn}
          name="facebook"
          onPress={this.onFacebookLoginPress}
        />
        {/* TODO: Add more social login buttons. */}
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled,
}), { nativeSignIn })(Social);
