import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

class OfflinePage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    online: PropTypes.bool.isRequired,
  };

  render() {
    const { auth, fields, online } = this.props;

    return (
      <div className="offline-page">
        <FormattedMessage {...linksMessages.offline}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          Offline
        </h2>
        <p>
          Este app works <a href="http://offlinefirst.org/">offline</a>. To
          test offline mode, disable wifi and restart app via <code>gulp</code>.
        </p>
        <p>
          Network state:<br />
          <code>state.app.online: <b>{online.toString()}</b></code>
        </p>
        <p>
          Auth state:<br />
          <code>state.auth.isAuthenticated: <b>{
            auth.isAuthenticated.toString()
          }</b></code><br />
          <code>state.auth.token: <b>{
            auth.token ? auth.token.slice(0, 16) : 'null'
          }</b></code>
        </p>
        <p>
          All editable fields are persisted in the local storage by default. But
          syncing is hard, so that's why we disable the input during offline.
        </p>
        <input
          {...fields.somePersistedText}
          disabled={!online}
          type="text"
        />
        <p>
          The user state is also persisted in the local storage. Check{' '}
          <code>configureStorage.js</code>.
        </p>
        <p>TODO: Explain easy immutable offline syncing.</p>
      </div>
    );
  }

}

OfflinePage = fields(OfflinePage, {
  path: 'offline',
  fields: [
    'somePersistedText'
  ]
});

export default connect(state => ({
  auth: state.auth,
  online: state.app.online
}))(OfflinePage);
