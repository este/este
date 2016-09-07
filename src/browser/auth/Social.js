/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button } from '../app/components';
import { connect } from 'react-redux';
import { signIn } from '../../common/lib/redux-firebase/actions';

const Social = ({ disabled, signIn }) => {
  const onButtonClick = e => {
    if (disabled) return;
    const { provider } = e.currentTarget.dataset;
    signIn(provider);
  };

  return (
    <Button
      data-provider="facebook"
      onClick={onButtonClick}
    >
      <FormattedMessage {...buttonsMessages.facebookSignIn} />
    </Button>
  );
};

Social.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  signIn: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  disabled: state.auth.formDisabled,
}), { signIn })(Social);
