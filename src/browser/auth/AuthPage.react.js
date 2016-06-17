import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Login from './Login.react';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { locationShape } from 'react-router';

export default class AuthPage extends Component {

  static propTypes = {
    location: locationShape
  };

  render() {
    const { location } = this.props;

    return (
      <div className="auth-page">
        <FormattedMessage {...linksMessages.login}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <Login location={location} />
      </div>
    );
  }

}
