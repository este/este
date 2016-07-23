import './SignIn.scss';
import Component from 'react-pure-render/component';
import Email from './Email.react';
import React, { PropTypes } from 'react';
import SignInError from './SignInError.react';
import Social from './Social.react';
import { connect } from 'react-redux';
import { locationShape, routerShape, withRouter } from 'react-router';

class SignIn extends Component {

  static propTypes = {
    location: locationShape,
    redirectTo: PropTypes.string.isRequired,
    router: routerShape,
    viewer: PropTypes.object,
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
    const url = location.state && location.state.nextPathname || redirectTo;
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
