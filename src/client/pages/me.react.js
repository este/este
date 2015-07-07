import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Logout from '../auth/logout.react';
import React from 'react';
import immutable from 'immutable';
import requireAuth from '../auth/requireauth.react';
import {msg} from '../intl/store';

@requireAuth
class Me extends Component {

  static propTypes = {
    viewer: React.PropTypes.instanceOf(immutable.Record).isRequired
  };

  render() {
    const {viewer: {email}} = this.props;

    return (
      <DocumentTitle title={msg('pages.me.title')}>
        <div className="me-page">
          <p>
            {msg('pages.me.welcome', {email})}
          </p>
          <Logout />
        </div>
      </DocumentTitle>
    );
  }

}

export default Me;
