import './Login.scss';
import Component from 'react-pure-render/component';
import EmailLogin from './EmailLogin.react';
import LoginError from './LoginError.react';
import React, { PropTypes } from 'react';
import SocialLogin from './SocialLogin.react';
import { connect } from 'react-redux';
import { locationShape, routerShape, withRouter } from 'react-router';

class Login extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: locationShape,
    redirectTo: PropTypes.string.isRequired,
    router: routerShape,
  };

  static defaultProps = {
    redirectTo: '/'
  };

  constructor(props) {
    super(props);
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ isAuthenticated }) {
    if (!isAuthenticated) return;
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
    const { isAuthenticated } = this.props;
    if (isAuthenticated) return null;

    return (
      <div className="login">
        <SocialLogin />
        <EmailLogin />
        <LoginError />
      </div>
    );
  }

}

Login = withRouter(Login);

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(Login);
