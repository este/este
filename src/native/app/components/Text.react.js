import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../../../common/app/theme';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
  },
});

// Normalize multiline strings because Text component preserves spaces.
const normalizeMultilineString = message => message.replace(/ +/g, ' ').trim();

export default class AppText extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
  };

  render() {
    const { children, style } = this.props;
    return (
      <Text {...this.props} style={[styles.text, style]}>
        {typeof children === 'string'
          ? normalizeMultilineString(children)
          : children
        }
      </Text>
    );
  }

}
