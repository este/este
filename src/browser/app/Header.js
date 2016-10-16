/* @flow */
import React from 'react';
import { Link, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
};

const Header = () => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">
      Home
    </Link>
  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Header);
