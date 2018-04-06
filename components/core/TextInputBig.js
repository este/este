// @flow
import * as React from 'react';
import Error from './Error';
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
              style={theme.styles.textInputBig}
              {...props}
            />
            <View style={theme.styles.textInputBigError}>
              <Error size={size - 1}>{error}</Error>
            </View>
          </View>
        )}
      </Theme>
    );
  }
}

export default TextInputBig;
