// @flow
import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import TextInput, { type TextInputProps } from './TextInput';
import { View } from 'react-native';
import withTheme, { type Theme } from './withTheme';

class TextInputBig extends React.PureComponent<{|
  ...TextInputProps,
  theme: Theme,
|}> {
  render() {
    const { error, size = 1, theme, ...props } = this.props;

    return (
      <View>
        <TextInput size={size} style={theme.styles.textInputBig} {...props} />
        <View style={theme.styles.textInputBigError}>
          <ErrorMessage size={size - 1} error={error} />
        </View>
      </View>
    );
  }
}

export default withTheme(TextInputBig);
