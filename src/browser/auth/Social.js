/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signIn } from '../../common/lib/redux-firebase/actions';

const Social = ({ disabled, signIn }) => {
  const onButtonClick = e => {
    const { provider } = e.currentTarget.dataset;
    signIn(provider);
  };

  return (
    <div className="social">
      <button
        data-provider="facebook"
        disabled={disabled}
        onClick={onButtonClick}
      >
        <FormattedMessage {...buttonsMessages.facebookSignIn} />
      </button>
    </div>
  );
};

Social.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  signIn: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  disabled: state.auth.formDisabled,
}), { signIn })(Social);
