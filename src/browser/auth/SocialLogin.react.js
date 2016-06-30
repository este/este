import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { login } from '../../common/lib/redux-firebase/actions';

const messages = defineMessages({
  facebookLogin: {
    defaultMessage: 'Facebook Login',
    id: 'firebase.login.facebookLogin'
  }
});

// TODO: Add all social providers with configuration via default props.
class SocialLogin extends Component {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async onButtonClick(e) {
    const { login } = this.props;
    const { provider } = e.currentTarget.dataset;
    try {
      await login(provider);
    } catch (error) {
      const { reason } = error;
      if (reason.code === 'USER_CANCELLED') {
        return;
      }
      throw error;
    }
  }

  render() {
    const { disabled } = this.props;

    return (
      <div className="social-login">
        <button
          data-provider="facebook"
          disabled={disabled}
          onClick={this.onButtonClick}
        >
          <FormattedMessage {...messages.facebookLogin} />
        </button>
      </div>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled
}), { login })(SocialLogin);
