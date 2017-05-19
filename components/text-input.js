// @flow
import Box from './box';
import Text, { type TextProps } from './text';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// TODO: multiline and rows, use PlatformTextarea, react-autosize-textarea?

export type TextInputProps = TextProps & {
  disabled?: boolean,
  error?: string,
  label?: string,
  onChange: (text: string) => void,
};

const computePlaceholderTextColor = (colors, color) =>
  colorLib(colors[color]).fade(0.5).toString();

const TextInput = (props: TextInputProps, { theme }: ThemeContext) => {
  const {
    color = theme.text.color,
    error = '\u00A0', // Preserve vertical space for an error.
    label,
    onChange,
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
      {label && <Text bold size={size - 1}>{label}</Text>}
      {/* TODO: Native ofc */}
      <Text
        as="input"
        color={color}
        onChange={({ currentTarget: { value } }) => onChange(value)}
        size={size}
        {...(restProps.disabled
          ? { opacity: theme.textInput.disabledOpacity }
          : null)}
        {...restProps}
        style={style}
      />
      <Text bold color="danger" size={size - 1}>{error}</Text>
    </Box>
  );
};

withTheme(TextInput);

export default TextInput;
