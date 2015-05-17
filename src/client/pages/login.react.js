import DocumentTitle from 'react-document-title';
import LoginForm from '../auth/login.react';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
import {msg} from '../intl/store';

class Login extends PureComponent {

  render() {
    return (
      <DocumentTitle title={msg('auth.title')}>
        <div className="login-page">
          <LoginForm {...this.props} />
        </div>
      </DocumentTitle>
    );
  }

}

export default Login;
