// @flow
import React, { type Element } from 'react';
import Box from './Box';
import Set from './Set';
import Text, { type TextProps } from './Text';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// As for optional maxLength, I believe it belongs to validation and user should
// have an option to write or paste more text and edit it later.
// TODO: multiline and rows, use content editable because links.

export type TextInputProps = TextProps & {
  disabled?: boolean,
  error?: string | Element<any>,
  label?: string | Element<any>,
  maxLength?: number,
  onChange?: (text: string) => void,
  onSubmitEditing?: () => void,
};

const computePlaceholderTextColor = (colors, color) =>
  colorLib(colors[color]).fade(0.5).toString();

const TextInput = (props: TextInputProps, { theme }: ThemeContext) => {
  const {
    color = theme.text.color,
    error,
    label,
    maxLength = 256,
    onChange,
    onSubmitEditing,
    size = 0,
    ...restProps
  } = props;

  const style = {
    ...(restProps.isReactNative
      ? null
      : {
          '::placeholder': {
            color: computePlaceholderTextColor(theme.colors, color),
          },
          backgroundColor: 'transparent',
          outline: 'none',
        }),
    ...restProps.style,
  };

  return (
    <Box>
      <Set marginBottom={0}>
        {label &&
          (typeof label === 'string'
            ? <Text bold size={size}>
                {label}
              </Text>
            : label)}
        {error &&
          (typeof error === 'string'
            ? <Text bold color="danger" size={size}>
                {error}
              </Text>
            : error)}
      </Set>
      <Text
        as="input"
        color={color}
        size={size}
        maxLength={maxLength}
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
        style={style}
      />
    </Box>
  );
};

withTheme(TextInput);

export default TextInput;
