import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component, PropTypes } from 'react';
import theme from './theme';
import { Button, Text } from './components';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { showMenu } from '../../common/app/actions';

const iOSDefaultStatusBarHeight = 20;
const paddingTopOffset = Platform.OS === 'ios' ? iOSDefaultStatusBarHeight : 0;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center', // align items in the cross-axis flexDirection
    backgroundColor: theme.brandPrimary,
    borderBottomColor: theme.light(theme.brandPrimary),
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between', // align items in the flexDirection
    paddingBottom: theme.fontSize * .625,
    paddingTop: (theme.fontSize * .625) + paddingTopOffset,
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

class Header extends Component {

  static propTypes = {
    menuShown: PropTypes.bool.isRequired,
    showMenu: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { menuShown, showMenu, title } = this.props;

    return (
      <View style={styles.header}>
        <Button onPress={() => showMenu(!menuShown)} style={styles.button}>
          <Icon name="ios-menu" style={styles.icon} />
        </Button>
        <Text style={styles.title}>{title}</Text>
        <Button style={styles.button}>
          {/* This is a placeholder for the right side button. */}
          {/* <Icon name="ios-menu" style={styles.icon} /> */}
        </Button>
      </View>
    );
  }

}

Header = connect(state => ({
  menuShown: state.app.menuShown,
}), { showMenu })(Header);

export default Header;
