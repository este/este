// @flow
import type { Element } from 'react';
import Box from './box';
import Set from './set';
import Text, { type TextProps } from './text';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// TODO: multiline and rows, use content editable because links.

export type TextInputProps = TextProps & {
  disabled?: boolean,
  error?: string | Element<*>,
  label?: string | Element<*>,
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
        {...(onChange
          ? {
              onChange: (e: { currentTarget: HTMLInputElement }) =>
                onChange(e.currentTarget.value),
            }
          : null)}
        {...(onSubmitEditing
          ? {
              onKeyDown: (e: SyntheticKeyboardEvent) => {
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
