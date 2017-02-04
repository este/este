// @flow
import type { ColorProps, Theme } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text, { computeTextStyle } from './Text';
import isReactNative from '../../common/app/isReactNative';

export type ButtonProps = ColorProps & TextProps & {
  // For blindness accessibility features. Consider making it mandatory.
  accessibilityLabel?: string,
  boxStyle?: (theme: Theme) => Object,
  children?: any,
  disabled?: boolean,
  onPress?: (e?: SyntheticMouseEvent) => any,
  outline?: boolean,
  textStyle?: (theme: Theme) => Object,
};

type ButtonContext = {
  Button: () => React.Element<*>,
  theme: Theme,
};

const Button = ({
  as,
  accessibilityLabel,
  boxStyle,
  children,
  disabled,
  onPress,
  outline,
  textStyle,
  ...props
}: ButtonProps, {
  Button: PlatformButton,
  theme,
}: ButtonContext) => {
  const platformProps = isReactNative ? {
    accessibilityComponentType: 'button',
    accessibilityLabel,
    accessibilityTraits: ['button'],
    activeOpacity: theme.states.active.opacity,
    onPress,
  } : {
    onClick: onPress,
  };

  const colorProps = Object.keys(theme.colors);

  // <Button primary
  // any is needed probably because Array find is not yet fully typed.
  const propColor: any = colorProps.find(color => props[color]);
  if (propColor) {
    props = {
      ...props,
      backgroundColor: propColor,
      bold: true,
      color: 'white',
      paddingHorizontal: 1,
    };
  }

  // <Button primary outline
  if (propColor && outline) {
    delete props.backgroundColor;
    props = {
      ...props,
      bold: false,
      borderColor: props.backgroundColor,
      borderStyle: 'solid',
      borderWidth: 1,
      color: props.backgroundColor,
      paddingHorizontal: 1,
    };
  }

  // Give button some vertical space.
  const { size = 0 } = props;
  if (size >= 0) {
    props = {
      marginVertical: 0.3,
      paddingVertical: 0.2,
      ...props,
    };
  } else {
    props = {
      marginVertical: 0.5,
      ...props,
    };
    if (props.borderWidth) {
      props = {
        // Ensure vertical Rhythm for Button size < 0. The lineHeight is the
        // only possible way how to do it. It doesn't work for multilines
        lineHeight: theme.typography.lineHeight - (2 * props.borderWidth),
        ...props,
      };
    }
  }

  // Button consists of two components, Box and Text. That's because Button can
  // render not only text, but any component, and React Native Text can't
  // contain View based components.
  // Therefore, we have to split props for Box and props for Text. Fortunately,
  // that's what computeTextStyle does by design. It picks own props and return
  // the rest. We can also use boxStyle and textStyle props for further styling.
  const [computedTextStyle, allBoxProps] = computeTextStyle(theme, props);
  // To prevent "Unknown prop" warning, we have to remove color props.
  const boxProps = colorProps.reduce((props, prop) => {
    delete props[prop];
    return props;
  }, allBoxProps);
  const childrenIsText = typeof children === 'string';
  const {
    borderRadius = theme.button.borderRadius,
  } = props;

  return (
    <Box
      as={as || PlatformButton}
      borderRadius={borderRadius}
      disabled={disabled} // Do we need that?
      flexDirection="row"
      justifyContent="center"
      opacity={disabled ? theme.states.disabled.opacity : 1}
      {...platformProps}
      {...boxProps}
      style={boxStyle}
    >
      {childrenIsText ?
        <Text
          // Pass backgroundColor to Text for maybeFixFontSmoothing function.
          backgroundColor={props.backgroundColor}
          style={theme => ({
            ...computedTextStyle,
            ...(textStyle && textStyle(theme, computedTextStyle)),
          })}
        >{children}</Text>
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
