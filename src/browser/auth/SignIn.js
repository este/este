/* @flow */
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import { Block, View } from '../app/components';
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

  wasRedirected: boolean;

  redirect() {
    const { location, redirectTo, router } = this.props;
    const url = (location.state && location.state.nextPathname) || redirectTo;
    router.replace(url);
  }

  render() {
    return (
      <View>
        <Block>
          <Social />
        </Block>
        <Block>
          <Email />
        </Block>
        <SignInError />
      </View>
    );
  }

}

SignIn = withRouter(SignIn);

export default connect(state => ({
  viewer: state.users.viewer,
}))(SignIn);
