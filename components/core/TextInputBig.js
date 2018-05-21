// @flow
import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import TextInput, { type TextInputProps } from './TextInput';
import { View } from 'react-native';
import ThemeContext from './ThemeContext';

class TextInputBig extends React.PureComponent<TextInputProps> {
  render() {
    const { error, size = 1, ...props } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View>
            <TextInput
              size={size}
              style={theme.styles.textInputBig}
              {...props}
            />
            <View style={theme.styles.textInputBigError}>
              <ErrorMessage size={size - 1} error={error} />
            </View>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default TextInputBig;
