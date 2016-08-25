/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Container extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    inverse: React.PropTypes.bool,
    style: View.propTypes.style,
  };

  render() {
    const { children, inverse, style, ...props } = this.props;
    const backgroundColor = inverse
      ? theme.inverseBackgroundColor
      : theme.backgroundColor;

    return (
      <View
        {...props}
        style={[styles.container, { backgroundColor }, style]}
      >
        {children}
      </View>
    );
  }

}

export default Container;
