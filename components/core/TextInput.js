// @flow
import * as React from 'react';
import { StyleSheet, View, TextInput as TextInputNative } from 'react-native';
import Theme from './Theme';
import colorLib from 'color';
import Text from './Text';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { Error as ErrorType } from '../../server/error';
import Error from './Error';

// This is just a stub for inputRef type.
class ReactNativeWebTextInputElementStub extends React.Component<{}> {
  blur() {}
  focus() {}
}

export type TextInputProps = {
  disabled?: boolean,
  label?: string | React.Element<any>,
  error?: ?ErrorType,
  size?: number,
  style?: TextStyleProp,
  inputRef?: React.Ref<typeof ReactNativeWebTextInputElementStub>,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

const TextInputLabel = ({ label, size }) =>
  typeof label === 'string' ? (
    <Text bold size={size}>
      {label}
    </Text>
  ) : (
    label
  );

class TextInput extends React.PureComponent<TextInputProps> {
  render() {
    const {
      disabled,
      label,
      error,
      size = 0,
      style,
      inputRef,
      ...props
    } = this.props;
    return (
      <Theme>
        {theme => {
          const renderHeader = label != null || error != null;
          const placeholderTextColor = colorLib(
            theme.colors[theme.textColor],
          ).fade(0.5);

          return (
            <View>
              {renderHeader && (
                <View style={styles.header}>
                  {label != null && (
                    <TextInputLabel label={label} size={size} />
                  )}
                  {error != null && (
                    <React.Fragment>
                      <Text> </Text>
                      <Error size={size}>{error}</Error>
                    </React.Fragment>
                  )}
                </View>
              )}
              <TextInputNative
                disabled={disabled}
                placeholderTextColor={placeholderTextColor.toString()}
                style={[
                  theme.styles.textInput,
                  theme.typography.fontSizeWithLineHeight(size),
                  style,
                ]}
                ref={inputRef}
                {...props}
              />
            </View>
          );
        }}
      </Theme>
    );
  }
}

export default TextInput;
