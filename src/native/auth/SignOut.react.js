import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button, View } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

class SignOut extends Component {

  static propTypes = {
    signOut: PropTypes.func.isRequired
  };

  render() {
    const { signOut } = this.props;

    return (
      <View>
        <FormattedMessage {...buttonsMessages.signOut}>
        {message =>
          <Button onPress={signOut}>{message}</Button>
        }
        </FormattedMessage>
      </View>
    );
  }

}

export default connect(null, { signOut })(SignOut);
