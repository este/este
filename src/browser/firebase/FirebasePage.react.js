import './FirebasePage.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Login from './Login.react';
import Profile from './Profile.react';
import React, { PropTypes } from 'react';
import Users from './Users.react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  loadMore: {
    defaultMessage: 'Load more',
    id: 'firebase.page.loadMore'
  }
});

class FirebasePage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const { intl, viewer } = this.props;
    const title = intl.formatMessage(linksMessages.firebase);

    return (
      <div className="firebase-page">
        <Helmet title={title} />
        <h2>
          <a href="https://www.firebase.com/" target="_blank">
            <img alt="Firebase Logo" height="27" src={require('./FirebaseLogo.png')} width="140" />
          </a>
        </h2>
        {viewer ?
          <Profile />
        :
          <Login />
        }
        <Users limitToLast={10} />
        <button disabled>
          TODO: <FormattedMessage {...messages.loadMore} />
        </button>
      </div>
    );
  }

}

FirebasePage = injectIntl(FirebasePage);

export default connect(state => ({
  viewer: state.users.viewer
}))(FirebasePage);
