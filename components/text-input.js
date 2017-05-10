// @flow
import Text, { type TextProps } from './text';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// TODO: multiline and rows, use PlatformTextarea, react-autosize-textarea?

export type TextInputProps = TextProps & {
  disabled?: boolean,
};

const computePlaceholderTextColor = (colors, color) =>
  colorLib(colors[color]).fade(0.5).toString();

const TextInput = (props: TextInputProps, { theme }: ThemeContext) => {
  const { color = theme.text.color, ...restProps } = props;

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
    <Text
      as="input"
      color={color}
      {...(restProps.disabled
        ? { opacity: theme.textInput.disabledOpacity }
        : null)}
      {...restProps}
      style={style}
    />
  );
};

withTheme(TextInput);

export default TextInput;
