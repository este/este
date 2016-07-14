import Component from 'react-pure-render/component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { nativeSignIn } from '../../common/lib/redux-firebase/actions';

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
      <View>
        <FormattedMessage {...buttonsMessages.facebookSignIn}>
          {message =>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.onFacebookLoginPress}
            >{message}</Icon.Button>
          }
        </FormattedMessage>
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled
}), { nativeSignIn })(Social);
