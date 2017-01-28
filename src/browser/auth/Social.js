// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signIn } from '../../common/auth/actions';

type SocialProps = { formDisabled: boolean, signIn: typeof signIn };

const Social = ({ formDisabled, signIn }: SocialProps) => (
  <Box flexDirection="row">
    <FormattedMessage {...buttonsMessages.facebookSignIn}>
      {message => (
        <Button
          primary
          disabled={formDisabled}
          onPress={() => signIn('facebook')}
        >
          {message}
        </Button>
      )}
    </FormattedMessage>
  </Box>
);

export default connect(
  (state: State) => ({ formDisabled: state.auth.formDisabled }),
  { signIn },
)(Social);
