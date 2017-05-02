// @flow
import Text, { type TextProps } from './text';
import colorLib from 'color';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component. Check Field.
// TODO: multiline and rows, use PlatformTextarea, react-autosize-textarea?

type TextInputProps = TextProps & {
  disabled?: boolean,
};

const computeConsistentPlaceholderTextColor = (colors, color) =>
  colorLib(colors[color]).fade(0.5).toString();

const TextInput = (props: TextInputProps) => (
  <Text
    as="input"
    style={(theme, mixStyles) => {
      const {
        borderWidth = 0, // Enforce text look.
        color = theme.text.color,
        padding = 0, // Enforce text look.
        ...restProps
      } = mixStyles(props);
      return {
        borderWidth,
        color,
        padding,
        ...(restProps.disabled
          ? { opacity: theme.textInput.disabledOpacity }
          : null),
        ...restProps,
        rawStyle: {
          '::placeholder': {
            color: computeConsistentPlaceholderTextColor(theme.colors, color),
          },
          backgroundColor: 'transparent',
          outline: 'none',
          // Reset Text specific styles.
          whiteSpace: undefined,
          overflowWrap: undefined,
          msHyphens: undefined,
        },
      };
    }}
  />
);

export default TextInput;
