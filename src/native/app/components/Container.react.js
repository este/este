import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
    inverse: PropTypes.bool,
    style: View.propTypes.style,
  };

  render() {
    const { children, inverse, style } = this.props;
    const backgroundColor = inverse
      ? theme.inverseBackgroundColor
      : theme.backgroundColor;

    return (
      <View
        {...this.props}
        style={[styles.container, { backgroundColor }, style]}
      >
        {children}
      </View>
    );
  }

}
