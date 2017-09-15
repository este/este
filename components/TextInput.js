// @flow
import React, { type Element } from 'react';
import Box from './Box';
import Set from './Set';
import Text, { type TextProps } from './Text';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check TextInputBig.
// TODO: Multiline and rows. Use content editable rather because of links?

export type TextInputProps = {
  disabled?: boolean,
  error?: string | Element<any>,
  label?: string | Element<any>,
  maxLength?: number,
  onChange?: (text: string) => void,
  onSubmitEditing?: () => void,
} & TextProps;

const computePlaceholderTextColor = (colors, color) =>
  colorLib(colors[color])
    .fade(0.5)
    .toString();

const TextInput = (props: TextInputProps, { theme }: ThemeContext) => {
  const {
    color = theme.text.color,
    error,
    label,
    onChange,
    onSubmitEditing,
    size = 0,
    style,
    ...restProps
  } = props;

  const reactNativeEmulation = restProps.isReactNative
    ? null
    : {
        '::placeholder': {
          color: computePlaceholderTextColor(theme.colors, color),
        },
        backgroundColor: 'transparent',
        outline: 'none',
      };

  return (
    <Box>
      <Set marginBottom={0}>
        {label &&
          (typeof label === 'string' ? (
            <Text bold size={size}>
              {label}
            </Text>
          ) : (
            label
          ))}
        {error &&
          (typeof error === 'string' ? (
            <Text bold color="danger" size={size}>
              {error}
            </Text>
          ) : (
            error
          ))}
      </Set>
      <Text
        as="input"
        color={color}
        size={size}
        {...(onChange
          ? {
              onChange: (e: { currentTarget: HTMLInputElement }) =>
                onChange(e.currentTarget.value),
            }
          : null)}
        {...(onSubmitEditing
          ? {
              onKeyDown: (e: SyntheticKeyboardEvent<>) => {
                if (e.key !== 'Enter') return;
                onSubmitEditing();
              },
            }
          : null)}
        {...(restProps.disabled
          ? { opacity: theme.textInput.disabledOpacity }
          : null)}
        {...restProps}
        style={{
          ...reactNativeEmulation,
          ...style,
        }}
      />
    </Box>
  );
};

withTheme(TextInput);

export default TextInput;
