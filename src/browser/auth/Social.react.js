import React, { Component, PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signIn } from '../../common/lib/redux-firebase/actions';

class Social extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    const { signIn } = this.props;
    const { provider } = e.currentTarget.dataset;
    signIn(provider);
  }

  render() {
    const { disabled } = this.props;

    return (
      <div className="social">
        <button
          data-provider="facebook"
          disabled={disabled}
          onClick={this.onButtonClick}
        >
          <FormattedMessage {...buttonsMessages.facebookSignIn} />
        </button>
      </div>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled,
}), { signIn })(Social);
