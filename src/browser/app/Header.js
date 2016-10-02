/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { View, Link, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    {viewer &&
      <View>
        <Link bold inverted exactly to="/chat">
          <FormattedMessage {...linksMessages.chat} />
        </Link>
        <Space x={2} />
        <Link bold inverted to="/me">
          <FormattedMessage {...linksMessages.me} />
        </Link>
      </View>
    }
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

export default connect(state => ({
  viewer: state.users.viewer,
}))(Header);
