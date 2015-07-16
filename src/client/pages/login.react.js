import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import LoginForm from '../auth/login.react';
import React from 'react';
import {msg} from '../intl/store';

export default class Login extends Component {

  render() {
    return (
      <DocumentTitle title={msg('pages.auth.title')}>
        <div className="login-page">
          <LoginForm {...this.props} />
        </div>
      </DocumentTitle>
    );
  }

}
