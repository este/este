// @flow
import React, { useRef, useEffect, useMemo, type Element } from 'react';
import { View, TextInput as TextInputNative } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Text from './Text';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import ErrorMessage, { type MessageError } from './ErrorMessage';
import throttle from 'lodash.throttle';

export default function TextInput(props: {|
  disabled?: boolean,
  label?: string | Element<any>,
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
|}) {
  const {
    disabled,
    label,
    error,
    size = 0,
    style,
    focusOnError,
    placeholder,
    onChangeText,
    onChangeTextThrottled,
    ...restProps
  } = props;

  const inputRef = useRef(null);
  const theme = useTheme();

  // Validation creates a new object which can be used for focusOnError.
  useEffect(
    () => {
      if (error == null || inputRef.current == null) return;
      inputRef.current.focus();
    },
    [focusOnError],
  );

  const handleOnChangeTextThrottled = useMemo(() => {
    return throttle(text => {
      if (onChangeTextThrottled) onChangeTextThrottled(text);
    }, 1000);
  }, []);

  function handleOnChangeText(text: string) {
    if (onChangeText) onChangeText(text);
    handleOnChangeTextThrottled(text);
  }

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
        ref={inputRef}
        placeholder={placeholder}
        blurOnSubmit={false}
        onChangeText={handleOnChangeText}
        {...restProps}
      />
      <View style={theme.styles.textInputError}>
        <ErrorMessage size={size - 1} error={error} />
      </View>
    </View>
  );
}
