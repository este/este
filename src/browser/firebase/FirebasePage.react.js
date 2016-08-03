import Helmet from 'react-helmet';
import OnlineUsers from '../users/OnlineUsers.react';
import React, { PureComponent } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

export default class FirebasePage extends PureComponent {

  render() {
    return (
      <div className="firebase-page">
        <FormattedMessage {...linksMessages.firebase}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <h2>
          <a href="https://firebase.google.com/">
            <img
              role="presentation"
              src={require('./logo.png')}
              style={{ height: 27, width: 140 }}
            />
          </a>
        </h2>
        <h3>
          Online users
        </h3>
        <OnlineUsers />
      </div>
    );
  }

}
