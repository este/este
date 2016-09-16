/* @flow */
import './Header.scss';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 0 auto',
    minWidth: '100vw',
    // style: { border: '1px solid black', background: 'rgba(0,0,0,0.2)' },
    style: { border: '0px solid black', minWidth: '100vw' },
    li: { flex: '2' },
    social: { flex: '1' },
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    <Link bold index inverted to="/" id="li" style={styles.toolbar.li}>
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/firebase" id="li" style={styles.toolbar.li}>
      <FormattedMessage {...linksMessages.firebase} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/todos" id="li" style={styles.toolbar.li}>
      <FormattedMessage {...linksMessages.todos} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/fields" id="li" style={styles.toolbar.li}>
      <FormattedMessage {...linksMessages.fields} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/intl" id="li" style={styles.toolbar.li}>
      <FormattedMessage {...linksMessages.intl} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/offline" id="social" style={styles.toolbar.social}>
      <FormattedMessage {...linksMessages.offline} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/me" id="social" style={styles.toolbar.social}>
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    {!viewer &&
      <Link bold inverted to="/signin" id="social" style={styles.toolbar.social}>
        <FormattedMessage {...linksMessages.signIn} />
      </Link>
    }
  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Header);
