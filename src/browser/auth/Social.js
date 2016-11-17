/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button } from '../app/components';
import { connect } from 'react-redux';
import { signIn } from '../../common/auth/actions';

const Social = ({ disabled, signIn }) => (
  <Button disabled={disabled} onClick={() => signIn('facebook')}>
    <FormattedMessage {...buttonsMessages.facebookSignIn} />
  </Button>
);

Social.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  signIn: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    disabled: state.auth.formDisabled,
  }),
  { signIn },
)(Social);
