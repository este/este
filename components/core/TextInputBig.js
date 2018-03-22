// @flow
import * as React from 'react';
import Text from './Text';
import TextInput, { type TextInputProps } from './TextInput';
import { View } from 'react-native';
import Theme from './Theme';

class TextInputBig extends React.PureComponent<TextInputProps> {
  render() {
    const { error, size = 1, ...props } = this.props;

    return (
      <Theme>
        {theme => (
          <View>
            <TextInput
              size={size}
              style={theme.styles.textInputBig.input}
              {...props}
            />
            <View style={theme.styles.textInputBig.error}>
              {typeof error === 'string' ? (
                <Text color="danger" size={size - 1}>
                  {error}
                </Text>
              ) : (
                error
              )}
            </View>
          </View>
        )}
      </Theme>
    );
  }
}

export default TextInputBig;
