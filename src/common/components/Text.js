// @flow
import type { BoxProps } from './Box';
import type { Color, Theme } from '../themes/types';
import Box from './Box';
import React from 'react';
import colorLib from 'color';
import isReactNative from '../../common/app/isReactNative';

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
  lineHeight?: number,
  // TODO: shadowColor, shadowOffset, shadowRadius.
  // Custom
  fixWebFontSmoothing?: boolean,
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

export const computeTextStyle = (theme: Theme, {
  fontFamily = theme.text.fontFamily,
  size = 0,
  align,
  bold,
  color = 'black',
  decoration,
  italic,
  lineHeight,
  ...props
}: TextProps) => {
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
    style = { ...style, fontWeight: bold };
  }

  if (decoration) {
    style = { ...style, textDecoration: decoration };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  if (lineHeight) {
    style = { ...style, lineHeight };
  }

  return [style, props];
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on dark background.
const maybeFixFontSmoothing = (color, backgroundColor) => {
  const hasColorAndBackgroundColor =
    color &&
    color !== 'transparent' &&
    backgroundColor &&
    backgroundColor !== 'transparent';
  // console.log(hasColorAndBackgroundColor);
  if (!hasColorAndBackgroundColor) return null;
  const colorIsLighterThanBackgroundColor =
    colorLib(color).luminosity() >
    colorLib(backgroundColor).luminosity();
  if (!colorIsLighterThanBackgroundColor) return null;
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const computePlatformTextStyle = (boxStyle, textStyle, fixWebFontSmoothing) => {
  if (isReactNative) {
    if (textStyle.fontWeight) {
      textStyle = { ...textStyle, fontWeight: String(textStyle.fontWeight) };
    }
    if (textStyle.textDecoration) {
      textStyle = { ...textStyle, textDecorationLine: textStyle.textDecoration };
      delete textStyle.textDecoration;
    }
  } else {
    textStyle = {
      ...textStyle,
      ...(fixWebFontSmoothing
        ? maybeFixFontSmoothing(textStyle.color, boxStyle.backgroundColor)
        : null),
      lineHeight: `${textStyle.lineHeight}px`, // browsers need px
    };
  }
  return textStyle;
};

const Text = ({
  as,
  style,
  fixWebFontSmoothing = true,
  ...props
}: TextProps, {
  Text: PlatformText,
  theme,
}: TextContext) => {
  const [textStyle, restProps] = computeTextStyle(theme, props);
  return (
    <Box
      as={as || PlatformText}
      {...restProps}
      style={(theme, boxStyle) => computePlatformTextStyle(boxStyle, {
        ...textStyle,
        ...(style && style(theme, { ...boxStyle, ...textStyle })),
      }, fixWebFontSmoothing)}
    />
  );
};

Text.contextTypes = {
  Text: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Text;
