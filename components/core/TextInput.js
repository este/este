// @flow
import * as React from 'react';
import { View, TextInput as TextInputNative } from 'react-native';
import withTheme, { type Theme } from './withTheme';
import Text from './Text';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import ErrorMessage, { type MessageError } from './ErrorMessage';
import throttle from 'lodash/throttle';

export type TextInputProps = {|
  disabled?: boolean,
  label?: string | React.Element<any>,
  error?: ?MessageError,
  size?: number,
  style?: TextStyleProp,
  value?: string,
  focusOnError?: ?Object,
  secureTextEntry?: boolean,
  placeholder: string,
  onChangeText?: string => void,
  onChangeTextThrottled?: string => void,
  name?: string,
  keyboardType?: string,
  autoComplete?: string,
  onSubmitEditing?: () => void,
  defaultValue?: string,
  // Feel free to add any missing prop.
  // https://github.com/este/este/issues/1557
|};

// That's because TextInputProps is exported to reuse.
type TextInputPropsWithTheme = {|
  ...TextInputProps,
  theme: Theme,
|};

class TextInput extends React.PureComponent<TextInputPropsWithTheme> {
  componentDidUpdate(prevProps) {
    this.maybeFocusOnError(prevProps);
  }

  maybeFocusOnError(prevProps) {
    const doFocus =
      this.props.error != null &&
      // Simple trick not trick. Validation creates a new object, which we can
      // use to detect whether validation happen, therefore, focus this input.
      // Otherwise, we would have to expose input ref and maintain list of
      // focusable fields in form with switch with manual mapping... omg.
      this.props.focusOnError !== prevProps.focusOnError;
    if (!doFocus || !this.inputRef.current) return;
    this.inputRef.current.focus();
  }

  inputRef = React.createRef();

  handleOnChangeTextThrottled = throttle(value => {
    const { onChangeTextThrottled } = this.props;
    if (onChangeTextThrottled) onChangeTextThrottled(value);
  }, 1000);

  handleOnChangeText = value => {
    const { onChangeText } = this.props;
    if (onChangeText) onChangeText(value);
    this.handleOnChangeTextThrottled(value);
  };

  render() {
    const {
      disabled,
      label,
      error,
      size = 0,
      style,
      theme,
      focusOnError,
      placeholder,
      onChangeText,
      onChangeTextThrottled,
      ...props
    } = this.props;

    return (
      <View>
        {label != null && (
          <Text color="gray" size={size - 1}>
            {label}
          </Text>
        )}
        <TextInputNative
          disabled={disabled}
          placeholderTextColor={theme.placeholderTextColor}
          style={[
            theme.styles.textInput,
            theme.typography.fontSizeWithLineHeight(size),
            style,
          ]}
          ref={this.inputRef}
          placeholder={`${placeholder}…`}
          blurOnSubmit={false}
          onChangeText={this.handleOnChangeText}
          {...props}
        />
        <View style={theme.styles.textInputError}>
          <ErrorMessage size={size - 1} error={error} />
        </View>
      </View>
    );
  }
}

export default withTheme(TextInput);
