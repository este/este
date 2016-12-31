// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signIn } from '../../common/auth/actions';
import {
  Box,
  Button,
} from '../app/components';

type SocialProps = {
  formDisabled: boolean,
  signIn: typeof signIn,
};

const Social = ({ formDisabled, signIn }: SocialProps) => (
  <Box>
    <Button
      disabled={formDisabled}
      onClick={() => signIn('facebook')}
      primary
    >
      <FormattedMessage {...buttonsMessages.facebookSignIn} />
    </Button>
  </Box>
);

export default connect(
  (state: State) => ({
    formDisabled: state.auth.formDisabled,
  }),
  { signIn },
)(Social);
