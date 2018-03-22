// @flow
import * as React from 'react';
import { StyleSheet, View, TextInput as TextInputNative } from 'react-native';
import Theme from './Theme';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import colorLib from 'color';
import Text from './Text';

export type TextInputProps = {
  disabled?: boolean,
  label?: string | React.Element<any>,
  error?: string | React.Element<any>,
  size?: number,
  style?: StyleObj,
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

const TextInputError = ({ error, size }) =>
  typeof error === 'string' ? (
    <Text bold color="danger" size={size}>
      {error}
    </Text>
  ) : (
    error
  );

class TextInput extends React.PureComponent<TextInputProps> {
  render() {
    const { disabled, label, error, size = 0, style, ...props } = this.props;
    return (
      <Theme>
        {theme => {
          const placeholderTextColor = colorLib(
            theme.colors[theme.textColor],
          ).fade(0.5);
          const showHeader = label != null && error != null;

          return (
            <View>
              {showHeader && (
                <View style={styles.header}>
                  {label != null && (
                    <TextInputLabel label={label} size={size} />
                  )}
                  {error != null && (
                    <React.Fragment>
                      <Text> </Text>
                      <TextInputError error={error} size={size} />
                    </React.Fragment>
                  )}
                </View>
              )}
              <TextInputNative
                placeholderTextColor={placeholderTextColor.toString()}
                style={[
                  theme.styles.textInput.input,
                  theme.typography.fontSizeWithLineHeight(size),
                  disabled === true && theme.styles.textInput.disabled,
                  style,
                ]}
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
