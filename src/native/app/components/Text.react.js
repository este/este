import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: { // eslint-disable-line react-native/no-unused-styles
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.fontSize * theme.lineHeight,
  },
});

// Normalize multiline strings because Text component preserves spaces.
const normalizeMultilineString = message => message.replace(/ +/g, ' ').trim();

export default class AppText extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
  };

  constructor() {
    super();
    this.onTextRef = this.onTextRef.bind(this);
  }

  onTextRef(text) {
    this.text = text;
  }

  setNativeProps(nativeProps) {
    this.text.setNativeProps(nativeProps);
  }

  getTextStyleWithMaybeComputedLineHeight() {
    const { style } = this.props;
    if (!style) {
      return styles.text;
    }
    const customFontSize = StyleSheet.flatten(style).fontSize;
    if (!Number.isInteger(customFontSize)) {
      return [styles.text, style];
    }
    const lineHeight = customFontSize * theme.lineHeight;
    return [styles.text, style, { lineHeight }];
  }

  render() {
    const { children } = this.props;
    const textStyle = this.getTextStyleWithMaybeComputedLineHeight();

    return (
      <Text {...this.props} ref={this.onTextRef} style={textStyle}>
        {typeof children === 'string'
          ? normalizeMultilineString(children)
          : children
        }
      </Text>
    );
  }

}
