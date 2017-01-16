// @flow
import type { Color, Theme } from '../themes/types';
import Box from './Box';
import React from 'react';
import Text from './Text';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

export type ButtonProps = {
  accessibilityLabel?: string, // for blindness accessibility features
  bold?: boolean,
  color?: Color,
  disabled?: ?boolean,
  onPress?: (e?: SyntheticMouseEvent) => any,
  preset?: Color | 'outline',
  size?: number,
  title: string,
};

type ButtonContext = {
  Button: () => React.Element<*>,
  theme: Theme,
};

const capitalize = title => title[0].toUpperCase() + title.slice(1);

const computePreset = (theme, preset, size) => {
  if (!preset) return [{}, {}];
  const isInline = size < 0;
  let boxProps = {
    paddingHorizontal: 0.8,
  };
  let textProps = {};
  // Give button some vertical space, but only for positive size. Smaller button
  // can't have any padding nor border because it would break vertical rhythm.
  // It's impossible to compute because a text can be multiline.
  if (!isInline) {
    boxProps = {
      ...boxProps,
      marginVertical: 0.25,
      paddingVertical: 0.25,
    };
  }
  if (!isInline && preset === 'outline') {
    boxProps = {
      ...boxProps,
      borderColor: 'gray',
      borderWidth: 1,
    };
  }

  return [boxProps, textProps];
}

const Button = ({
  accessibilityLabel,
  bold,
  color,
  disabled,
  onPress,
  preset,
  size = 0,
  title,
}: ButtonProps, {
  Button: BaseButton,
  theme,
}: ButtonContext) => {
  const platformProps = isReactNative ? {
    accessibilityComponentType: 'button',
    accessibilityLabel,
    accessibilityTraits: ['button'],
    onPress,
  } : {
    onClick: onPress,
  };

  const [boxProps, textProps] = computePreset(theme, preset, size);

  return (
    <BaseButton
      {...platformProps}
      disabled={disabled}
    >
      <Box
        flexDirection="row"
        justifyContent="center"
        {...boxProps}
      >
        <Text
          bold={bold}
          color={color}
          size={size}
          {...textProps}
        >{capitalize(title)}</Text>
      </Box>
    </BaseButton>
  );
}

Button.contextTypes = {
  Button: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Button;
