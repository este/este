/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    borderBottomColor: theme.light(theme.placeholderTextColor),
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

class AppTextInput extends React.Component {

  static propTypes = {
    invalid: React.PropTypes.bool,
    inputStyle: Text.propTypes.style,
    viewStyle: View.propTypes.style,
  };

  static defaultProps = {
    invalid: false,
    placeholderTextColor: theme.placeholderTextColor,
  };

  render() {
    const { invalid, inputStyle, viewStyle } = this.props;

    return (
      <View style={[styles.view, invalid && styles.invalid, viewStyle]}>
        <TextInput
          {...this.props}
          underlineColorAndroid="transparent"
          style={[styles.input, inputStyle]}
        />
      </View>
    );
  }

}

export default AppTextInput;
