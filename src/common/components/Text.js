// @flow
import type { BoxProps } from './Box';
import type { Color, Theme } from '../themes/types';
import Box from './Box';
import React from 'react';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

// Universal styled Text component. The same API for browsers and React Native.
// Some props are ommited or limited or set to match React Native behaviour.
// Use style prop for platform specific styling.

export type TextProps = BoxProps & {
  fontFamily?: string,
  size?: number,
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: Color,
  decoration?: 'none' | 'underline' | 'line-through',
  italic?: boolean,
  // TODO: shadowColor, shadowOffset, shadowRadius.
};

type TextContext = {
  Text: () => React.Element<*>,
  theme: Theme,
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const fontSizeWithComputedLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

const computeTextStyle = (theme, {
  fontFamily = theme.text.fontFamily,
  size = 0,
  align,
  bold,
  color = 'black',
  decoration,
  italic,
  ...props
}) => {
  let style = {
    ...fontSizeWithComputedLineHeight(theme.typography, size),
    color: theme.colors[color],
    fontFamily,
  };

  if (align) {
    style = { ...style, textAlign: align };
  }

  if (bold) {
    const bold = theme.text.bold;
    style = { ...style, fontWeight: isReactNative ? String(bold) : bold };
  }

  if (decoration) {
    const prop = isReactNative ? 'textDecorationLine' : 'textDecoration';
    style = { ...style, [prop]: decoration };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  return [style, props];
};

const textPropsNotWorkingInReactNativeYet = [
 'borderBottomLeftRadius',
 'borderBottomRightRadius',
 'borderBottomWidth',
 'borderLeftWidth',
 'borderRightWidth',
 'borderTopLeftRadius',
 'borderTopRightRadius',
 'borderTopWidth',
];

const Text = ({
  as,
  style,
  ...props
}: TextProps, {
  Text: TextComponent,
  theme,
}: TextContext) => {
  if (process.env.NODE_ENV !== 'production') {
    textPropsNotWorkingInReactNativeYet.forEach(prop => {
      if (!(prop in props)) return;
      console.warn(`${prop} is not allowed on Text. Use Box.`);
    });
  }

  const [textStyle, restProps] = computeTextStyle(theme, props);

  return (
    <Box
      as={as || TextComponent}
      {...restProps}
      style={theme => ({
        ...textStyle,
        ...(style && style(theme)),
      })}
    />
  );
};

Text.contextTypes = {
  Text: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Text;
