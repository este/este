/* @flow */
import React from 'react';
import { Link, Toolbar } from '../app/components';

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

export default Header;
