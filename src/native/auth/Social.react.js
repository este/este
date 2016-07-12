import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fok } from '../../common/lib/redux-firebase/actions';

class Social extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fok: PropTypes.func.isRequired
  };

  render() {
    const { fok } = this.props;

    return (
      <View>
        <FormattedMessage {...buttonsMessages.facebookSignIn}>
          {message =>
            <Button onPress={fok}>{message}</Button>
          }
        </FormattedMessage>
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled
}), { fok })(Social);
