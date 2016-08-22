/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Header = ({ viewer }) => (
  <header>
    <h1>
      <Link to="/">
        <FormattedMessage {...linksMessages.home} />
      </Link>
    </h1>
    <ul>
      <li>
        <Link activeClassName="active" to="/firebase">
          <FormattedMessage {...linksMessages.firebase} />
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/todos">
          <FormattedMessage {...linksMessages.todos} />
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/fields">
          <FormattedMessage {...linksMessages.fields} />
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/intl">
          <FormattedMessage {...linksMessages.intl} />
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/offline">
          <FormattedMessage {...linksMessages.offline} />
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/me">
          <FormattedMessage {...linksMessages.me} />
        </Link>
      </li>
      {!viewer &&
        <li>
          <Link activeClassName="active" to="/signin">
            <FormattedMessage {...linksMessages.signIn} />
          </Link>
        </li>
      }
    </ul>
  </header>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Header);
