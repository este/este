// @flow
import React, { type Element } from 'react';
import Box from './Box';
import Set from './Set';
import Text, { type TextProps } from './Text';
import colorLib from 'color';
import withTheme, { type WithTheme } from './withTheme';

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

const reactNativeEmulation = {
  backgroundColor: 'transparent',
  outline: 'none',
};

const createPlaceholderColor = (colors, color) => {
  const placeholderColor = colorLib(colors[color]).fade(0.5);
  const className = `placeholderColor${placeholderColor.rgbNumber()}`;
  const placeholderStyle = `{ color: ${placeholderColor.toString()} }`;
  const styleHtml = `
    .${className}::-webkit-input-placeholder ${placeholderStyle};
    .${className}::-moz-placeholder ${placeholderStyle};
    .${className}:-ms-input-placeholder ${placeholderStyle};
    .${className}:-moz-placeholder ${placeholderStyle};
    .${className}::placeholder ${placeholderStyle};
  `;
  const style = <style dangerouslySetInnerHTML={{ __html: styleHtml }} />;
  return { style, className };
};

const TextInput = ({
  theme,
  color = theme.text.color,
  error,
  label,
  onChange,
  onSubmitEditing,
  size = 0,
  style,
  ...props
}) => {
  const placeholderColor = createPlaceholderColor(theme.colors, color);
  return (
    <Box>
      {placeholderColor.style}
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
        className={placeholderColor.className}
        color={color}
        size={size}
        {...(onChange
          ? {
              onChange: (e: { currentTarget: HTMLInputElement }) => {
                if (!onChange) return;
                onChange(e.currentTarget.value);
              },
            }
          : null)}
        {...(onSubmitEditing
          ? {
              onKeyDown: (e: SyntheticKeyboardEvent<>) => {
                if (e.key !== 'Enter' || !onSubmitEditing) return;
                onSubmitEditing();
              },
            }
          : null)}
        {...(props.disabled
          ? { opacity: theme.textInput.disabledOpacity }
          : null)}
        {...props}
        style={{
          ...reactNativeEmulation,
          ...style,
        }}
      />
    </Box>
  );
};

const TextInputWithTheme: WithTheme<TextInputProps> = withTheme(TextInput);

export default TextInputWithTheme;
