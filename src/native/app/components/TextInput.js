/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    borderBottomColor: theme.bright(theme.placeholderTextColor),
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: theme.fontSize * 1.5,
  },
  input: {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    height: theme.fontSize * 2.5,
  },
  invalid: {
    borderBottomColor: theme.brandDanger,
  },
});

type Props = {
  invalid: boolean,
  inputStyle: Object,
  viewStyle: Object,
};

const AppTextInput = ({ invalid, inputStyle, viewStyle, ...props }: Props) => (
  <View style={[styles.view, invalid && styles.invalid, viewStyle]}>
    <TextInput
      {...props}
      underlineColorAndroid="transparent"
      style={[styles.input, inputStyle]}
    />
  </View>
);

AppTextInput.defaultProps = {
  invalid: false,
  placeholderTextColor: theme.placeholderTextColor,
};

export default AppTextInput;
