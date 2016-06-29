import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import Users from './Users.react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

export default class FirebasePage extends Component {

  render() {
    return (
      <div className="firebase-page">
        <FormattedMessage {...linksMessages.firebase}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          <a href="https://www.firebase.com/" target="_blank">
            <img
              role="presentation"
              src={require('./logo.png')}
              style={{ height: 27, width: 140 }}
            />
          </a>
        </h2>
        <Users limitToLast={10} />
      </div>
    );
  }

}
