import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component, PropTypes } from 'react';
import theme from './theme';
import { Button, Text } from './components';
import { Platform, StyleSheet, View } from 'react-native';

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

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
  };

  render() {
    const { title, toggleSideMenu } = this.props;

    return (
      <View style={styles.header}>
        <Button onPress={toggleSideMenu} style={styles.button}>
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
