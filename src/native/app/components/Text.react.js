import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
  },
});

// Normalize multiline strings because Text component preserves spaces.
const normalizeMultilineString = message => message.replace(/ +/g, ' ').trim();

export default class AppText extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.text.setNativeProps(nativeProps);
  }

  render() {
    const { children, style } = this.props;
    return (
      <Text {...this.props} ref={text => { this.text = text; }} style={[styles.text, style]}>
        {typeof children === 'string'
          ? normalizeMultilineString(children)
          : children
        }
      </Text>
    );
  }

}
