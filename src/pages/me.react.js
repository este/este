import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Logout from '../auth/logout.react';
import React from 'react';
import immutable from 'immutable';
import requireAuth from '../auth/requireauth.react';
import {msg} from '../intl/store';

class Me extends Component {

  render() {
    const {viewer: {email}} = this.props;

    return (
      <DocumentTitle title={msg('me.title')}>
        <div className="me-page">
          <p>
            {msg('me.welcome', {email})}
          </p>
          <Logout />
        </div>
      </DocumentTitle>
    );
  }

}

Me.propTypes = {
  viewer: React.PropTypes.instanceOf(immutable.Record).isRequired
};

export default requireAuth(Me);
