import './Page.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Login from './Login.react';
import Profile from './Profile.react';
import React, { PropTypes } from 'react';
import Users from './Users.react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  loadMore: {
    defaultMessage: 'Load more',
    id: 'firebase.page.loadMore'
  }
});

class Page extends Component {

  static propTypes = {
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props;

    return (
      <div className="firebase-page">
        <Helmet title="Firebase" />
        <h2>
          <a href="https://www.firebase.com/" target="_blank">
            <img height="27" src={require('./FirebaseLogo.png')} width="140" />
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

export default connect(state => ({
  viewer: state.users.viewer
}))(Page);
