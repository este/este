import './SignIn.scss';
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import { connect } from 'react-redux';
import { locationShape, routerShape, withRouter } from 'react-router';

class SignIn extends React.Component {

  static propTypes = {
    location: locationShape,
    redirectTo: React.PropTypes.string.isRequired,
    router: routerShape,
    viewer: React.PropTypes.object,
  };

  static defaultProps = {
    redirectTo: '/',
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ viewer }) {
    if (!viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    this.redirect();
  }

  redirect() {
    const { location, redirectTo, router } = this.props;
    const url = (location.state && location.state.nextPathname) || redirectTo;
    router.replace(url);
  }

  render() {
    return (
      <div className="sign-in">
        <Social />
        <Email />
        <SignInError />
      </div>
    );
  }

}

SignIn = withRouter(SignIn);

export default connect(state => ({
  viewer: state.users.viewer,
}))(SignIn);
