import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import SignIn from './SignIn.react';
import routes from '../routes';
import { CenteredContainer } from '../app/components';
import { connect } from 'react-redux';

class SignInPage extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ navigator, viewer }) {
    if (!viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    navigator.replace(routes.home);
  }

  render() {
    return (
      <CenteredContainer>
        <SignIn />
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(SignInPage);
