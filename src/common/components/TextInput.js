// @flow
import type { Theme } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import isReactNative from '../../common/app/isReactNative';

// Universal text input component. By default, it looks like editable text.

type TextInputProps = TextProps & {
  disabled?: boolean,
};

type TextInputContext = {
  TextInput: () => React.Element<*>,
  theme: Theme,
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const computeRhythmHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  return lines;
};

const TextInput = ({
  disabled = false,
  size = 0,
  ...props
}: TextInputProps, {
  TextInput: PlatformTextInput,
  theme,
}: TextInputContext) => {
  const rhythmHeight = computeRhythmHeight(theme.typography, size);

  const platformProps = isReactNative ? {
    editable: !disabled,
    underlineColorAndroid: 'transparent',
    ...(disabled ? { opacity: theme.states.disabled.opacity } : null),
  } : {};

  return (
    <Text
      as={PlatformTextInput}
      height={rhythmHeight} // React Native TextInput needs explicit height.
      size={size}
      {...platformProps}
      {...props}
    />
  );
};

TextInput.contextTypes = {
  TextInput: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default TextInput;
