import React from 'react';
import DocumentTitle from 'react-document-title';
import Logout from '../auth/logout.react';
import requireAuth from '../auth/requireauth.react';
import {msg} from '../intl/store';
import PureComponent from '../components/purecomponent.react';

class Me extends PureComponent {

  render() {
    return (
      <DocumentTitle title={msg('me.title')}>
        <div>
          <p>
            This is your secret page.
          </p>
          <Logout />
        </div>
      </DocumentTitle>
    );
  }

}

export default requireAuth(Me);
