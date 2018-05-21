// @flow
import * as React from 'react';
import { StyleSheet, View, TextInput as TextInputNative } from 'react-native';
import ThemeContext from './ThemeContext';
import colorLib from 'color';
import Text from './Text';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import ErrorMessage, { type MessageError } from './ErrorMessage';

// This is just a stub for inputRef type.
class ReactNativeWebTextInputElementStub extends React.Component<{}> {
  // eslint-disable-next-line class-methods-use-this
  blur() {}
  // eslint-disable-next-line class-methods-use-this
  focus() {}
}

export type TextInputProps = {|
  disabled?: boolean,
  label?: string | React.Element<any>,
  error?: ?MessageError,
  size?: number,
  style?: TextStyleProp,
  inputRef?: React.Ref<typeof ReactNativeWebTextInputElementStub>,
  value?: string,
  secureTextEntry?: boolean,
  placeholder?: string,
  onChangeText: string => void,
  name?: string,
  keyboardType?: string,
  autoComplete?: string,
|};

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
      <ThemeContext.Consumer>
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
                    <>
                      <Text> </Text>
                      <ErrorMessage size={size} error={error} />
                    </>
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
      </ThemeContext.Consumer>
    );
  }
}

export default TextInput;
