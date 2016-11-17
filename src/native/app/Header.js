/* @flow */
import type { State } from '../../common/types';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import theme from './themes/initial';
import { Button, Text } from './components';
import { Platform, StyleSheet, View } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

const iOSDefaultStatusBarHeight = 20;
const paddingTopOffset = Platform.OS === 'ios' ? iOSDefaultStatusBarHeight : 0;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center', // align items in the cross-axis flexDirection
    backgroundColor: theme.brandPrimary,
    borderBottomColor: theme.bright(theme.brandPrimary),
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between', // align items in the flexDirection
    paddingBottom: theme.fontSize * 0.625,
    paddingTop: (theme.fontSize * 0.625) + paddingTopOffset,
  },
  title: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH5,
  },
  button: {
    alignItems: 'center',
    top: 2,
    width: theme.fontSize * 3,
  },
  icon: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH4,
  },
});

const Header = ({ menuShown, appShowMenu, title }) => (
  <View style={styles.header}>
    <Button onPress={() => appShowMenu(!menuShown)} style={styles.button}>
      <Icon name="ios-menu" style={styles.icon} />
    </Button>
    <Text style={styles.title}>{title}</Text>
    <Button style={styles.button}>
      {/* This is a placeholder for the right side button. */}
      {/* <Icon name="ios-menu" style={styles.icon} /> */}
    </Button>
  </View>
);

Header.propTypes = {
  appShowMenu: React.PropTypes.func.isRequired,
  menuShown: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default connect(
  (state: State) => ({
    menuShown: state.app.menuShown,
  }),
  { appShowMenu },
)(Header);
