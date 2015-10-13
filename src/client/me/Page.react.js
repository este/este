import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object,
    users: PropTypes.object
  }

  render() {
    const {msg, users: {viewer: {email}}} = this.props;

    return (
      <DocumentTitle title={msg.me.title}>
        <div className="me-page">
          <p>
            <FormattedMessage
              defaultMessage={msg.me.welcome}
              id={'msg.me.welcome'}
              values={{email}}
            />
          </p>
          <AuthLogout msg={msg.auth.logout} />
        </div>
      </DocumentTitle>
    );
  }

}
