import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
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

  async onButtonClick(e) {
    const { signIn } = this.props;
    const { provider } = e.currentTarget.dataset;
    try {
      await signIn(provider);
    } catch (error) {
      // Swallow innocuous error here, so it will not be reported.
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      throw error;
    }
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
