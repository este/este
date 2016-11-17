/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/users">
      <FormattedMessage {...linksMessages.users} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/todos">
      <FormattedMessage {...linksMessages.todos} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/fields">
      <FormattedMessage {...linksMessages.fields} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/intl">
      <FormattedMessage {...linksMessages.intl} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/offline">
      <FormattedMessage {...linksMessages.offline} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/me">
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    {!viewer &&
      <Link bold inverted to="/signin">
        <FormattedMessage {...linksMessages.signIn} />
      </Link>
    }
  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(Header);
