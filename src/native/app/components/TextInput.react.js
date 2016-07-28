import Component from 'react-pure-render/component';
import React from 'react';
import theme from '../../../common/app/theme';
import { StyleSheet, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    height: theme.fontSize * 2,
  },
});

export default class AppTextInput extends Component {

  static propTypes = {
    style: Text.propTypes.style,
  };

  static defaultProps = {
    placeholderTextColor: theme.placeholderTextColor,
  };

  render() {
    const { style } = this.props;

    return (
      <TextInput {...this.props} style={[styles.textInput, style]} />
    );
  }

}
