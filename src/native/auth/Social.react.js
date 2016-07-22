import Component from 'react-pure-render/component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { PropTypes } from 'react';
import SignOut from './SignOut.react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { nativeSignIn } from '../../common/lib/redux-firebase/actions';

const SocialLoginButton = ({ backgroundColor, message, name, onPress }) =>
  <FormattedMessage {...message}>
    {message =>
      <Icon.Button {...{ backgroundColor, name, onPress }}>
        {message}
      </Icon.Button>
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
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.onFacebookLoginPress = this.onFacebookLoginPress.bind(this);
  }

  async onFacebookLoginPress() {
    const { nativeSignIn } = this.props;
    try {
      await nativeSignIn('facebook');
    } catch (error) {
      // Swallow innocuous error here, so it will not be reported.
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      throw error;
    }
    // TODO: Redirect to requested or default page.
  }

  render() {
    const { disabled, viewer, style } = this.props;
    if (disabled) return null;

    return (
      <View style={style}>
        {viewer ?
          <SignOut />
        :
          <SocialLoginButton
            backgroundColor="#3b5998"
            message={buttonsMessages.facebookSignIn}
            name="facebook"
            onPress={this.onFacebookLoginPress}
          />
        }
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled,
  viewer: state.users.viewer,
}), { nativeSignIn })(Social);
