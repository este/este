import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button, FormattedMessage } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

class SignOut extends Component {

  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { signOut } = this.props;
    return (
      <Button onPress={signOut}>
        <FormattedMessage {...buttonsMessages.signOut} />
      </Button>
    );
  }

}

export default connect(null, { signOut })(SignOut);
