/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from './themes/initial';
import { FormattedMessage, Link } from './components';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { showMenu } from '../../common/app/actions';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: theme.fontSizeH5 * 0.5,
    paddingVertical: theme.fontSizeH5,
  },
  tabLink: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSize,
    padding: theme.fontSize * 0.625,
  },
  tabLinkActive: {
    color: theme.bright(theme.inverseTextColor),
    backgroundColor: theme.bright(theme.inverseBackgroundColor),
  },
});

let MenuLink = ({ message, showMenu, ...props }) => (
  <FormattedMessage {...message}>
    {message =>
      <Link
        {...props}
        activeStyle={styles.tabLinkActive}
        onPress={() => setTimeout(() => showMenu(false), 0)}
        style={styles.tabLink}
      >{message}</Link>
    }
  </FormattedMessage>
);

MenuLink.propTypes = {
  message: React.PropTypes.object.isRequired,
  showMenu: React.PropTypes.func.isRequired,
};

MenuLink = connect(null, { showMenu })(MenuLink);

const Menu = ({ viewer }) => (
  <ScrollView
    automaticallyAdjustContentInsets={false}
    contentContainerStyle={styles.contentContainer}
  >
    <MenuLink exactly to="/" message={linksMessages.home} />
    <MenuLink to="/todos" message={linksMessages.todos} />
    <MenuLink to="/intl" message={linksMessages.intl} />
    <MenuLink to="/offline" message={linksMessages.offline} />
    {viewer ?
      <MenuLink to="/me" message={linksMessages.me} />
    :
      <MenuLink to="/signin" message={linksMessages.signIn} />
    }
  </ScrollView>
);

Menu.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Menu);
