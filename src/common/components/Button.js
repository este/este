// @flow
import type { Color, Theme } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text, { computeTextStyle } from './Text';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

export type ButtonProps = TextProps & {
  accessibilityLabel?: string, // for blindness accessibility features
  boxStyle?: (theme: Theme) => Object,
  children?: any,
  disabled?: ?boolean,
  onPress?: (e?: SyntheticMouseEvent) => any,
  preset?: Color | 'outline',
  textStyle?: (theme: Theme) => Object,
};

type ButtonContext = {
  Button: () => React.Element<*>,
  theme: Theme,
};

const capitalize = title => title[0].toUpperCase() + title.slice(1);

const computePreset = (theme, preset, size = 0) => {
  if (!preset) return [{}, {}];
  const isInline = size < 0;
  let boxProps = {
    paddingHorizontal: 0.8,
  };
  const textProps = {};
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
};

const Button = ({
  accessibilityLabel,
  boxStyle,
  children,
  disabled,
  onPress,
  preset,
  textStyle,
  ...props
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

  // Button has all Text props, but it consists of two components: Box and Text.
  // Therefore, we have to split props for Box and props for Text. That's what
  // computeTextStyle does by design. Without that, we would have verbose API
  // like boxProps={{ margin: 1 }} textProps={{ color: 'primary' }}.
  // Remember, we can always override anything via boxStyle and textStyle props.
  const [computedTextStyle, boxProps] = computeTextStyle(theme, props);
  const [presetBoxProps, presetTextProps] = computePreset(theme, preset, props.size);

  const childrenIsText = typeof children === 'string';

  // disabled={disabled}
  return (
    <Box
      as={BaseButton}
      flexDirection="row"
      justifyContent="center"
      {...platformProps}
      {...boxProps}
      {...presetBoxProps}
      style={boxStyle}
    >
      {childrenIsText ?
        <Text
          {...presetTextProps}
          style={theme => ({
            ...computedTextStyle,
            ...(textStyle ? textStyle(theme) : null),
          })}
        >{children && capitalize(children)}</Text>
      :
        children
      }
    </Box>
  );
};

Button.contextTypes = {
  Button: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Button;
