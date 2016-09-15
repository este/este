/* @flow */
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import { Block, Loading, Message, View } from '../app/components';
import { connect } from 'react-redux';

class SignIn extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    redirectTo: React.PropTypes.string.isRequired,
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
    const { disabled } = this.props;
    return (
      <View>
        <Block>
          <Social />
        </Block>
        <Block>
          <Email />
        </Block>
        <SignInError />
        {disabled &&
          <Loading>
            {message =>
              <Message>{message}</Message>
            }
          </Loading>
        }
      </View>
    );
  }

}

export default connect(state => ({
  disabled: state.auth.formDisabled,
  viewer: state.users.viewer,
}))(SignIn);
