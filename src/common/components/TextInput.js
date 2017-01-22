// @flow
import type { TextProps } from './Text';
import type { Theme } from '../themes/types';
import React from 'react';
import Text, { computeTextStyle } from './Text';
import color from 'color';
import isReactNative from '../../common/app/isReactNative';

// Universal text input component. By default, it looks like editable text.
// For underline or the other effects, make a new component from this.

type TextInputProps = TextProps & {
  disabled?: boolean,
  placeholderTextColor?: string,
  underlined?: boolean
};

type TextInputContext = {
  TextInput: () => React.Element<*>,
  theme: Theme,
};

const computePlaceholderColor = textColor =>
  color(textColor).luminosity() > 0.5
    ? color(textColor).darken(0.2).string()
    : color(textColor).lighten(0.8).string();

const TextInput = (props: TextInputProps, {
  TextInput: PlatformTextInput,
  theme,
}: TextInputContext) => {
  const [textStyle] = computeTextStyle(theme, props);

  const {
    disabled = false,
    height = textStyle.lineHeight / theme.typography.lineHeight,
    placeholderTextColor = computePlaceholderColor(textStyle.color),
    ...restProps
  } = props;

  const platformProps = isReactNative ? {
    editable: !disabled,
    underlineColorAndroid: 'transparent',
    placeholderTextColor,
    ...(disabled ? { opacity: theme.states.disabled.opacity } : null),
  } : {}; // TODO: Browser placeholderTextColor etc.

  return (
    <Text
      as={PlatformTextInput}
      height={height} // React Native TextInput needs explicit height.
      {...platformProps}
      {...restProps}
    />
  );
};

TextInput.contextTypes = {
  TextInput: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default TextInput;
