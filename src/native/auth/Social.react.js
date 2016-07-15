import Component from 'react-pure-render/component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { PropTypes } from 'react';
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
    nativeSignIn: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFacebookLoginPress = this.onFacebookLoginPress.bind(this);
  }

  onFacebookLoginPress() {
    const { nativeSignIn } = this.props;
    nativeSignIn('facebook');
  }

  render() {
    return (
      <View style={{ alignItems: 'center', paddingTop: 64 }}>
        <SocialLoginButton
          backgroundColor="#3b5998"
          message={buttonsMessages.facebookSignIn}
          name="facebook"
          onPress={this.onFacebookLoginPress}
        />
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled
}), { nativeSignIn })(Social);
