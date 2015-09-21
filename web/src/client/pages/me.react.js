import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import Logout from '../auth/logout.react';
import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';

export default class Me extends Component {

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
          <Logout msg={msg.auth.logout} />
        </div>
      </DocumentTitle>
    );
  }

}
