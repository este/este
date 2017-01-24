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
  fixFontSmoothing?: boolean,
};

type TextContext = {
  Text: () => React.Element<*>,
  theme: Theme,
};

// github.com/facebook/react-native/issues/29#issuecomment-96588898
// React Native doesn't support borders (except borderWidth) on Text-like
// components, and we can't compensate them for the rhythm anyway. Use Box.
const textPropsNotWorkingInReactNativeYet = [
  'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth',
  'borderLeftWidth', 'borderRightWidth', 'borderTopLeftRadius',
  'borderTopRightRadius', 'borderTopWidth', 'borderWidth',
];

const maybeWarnAboutNotSupportedProps = props => {
  textPropsNotWorkingInReactNativeYet.forEach(prop => {
    if (!(prop in props)) return;
    console.warn( // eslint-disable-line no-console
      `${prop} is not allowed on Text-like component. Use Box wrapper.
    `);
  });
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
    style = { ...style, fontWeight: isReactNative ? String(bold) : bold };
  }

  if (decoration) {
    const prop = isReactNative ? 'textDecorationLine' : 'textDecoration';
    style = { ...style, [prop]: decoration };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  if (lineHeight) {
    style = { ...style, lineHeight };
  }

  return [style, props];
};

const computePlatformTextStyle = textStyle => isReactNative ? textStyle : {
  ...textStyle,
  lineHeight: `${textStyle.lineHeight}px`, // browsers need px lineHeight
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on dark background.
const maybeFixFontSmoothing = (fixFontSmoothing, color, backgroundColor) => {
  if (!fixFontSmoothing) return null;
  const hasColorAndBackgroundColor =
    color &&
    color !== 'transparent' &&
    backgroundColor &&
    backgroundColor !== 'transparent';
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

const Text = ({
  as,
  style,
  fixFontSmoothing = !isReactNative,
  ...props
}: TextProps, {
  Text: PlatformText,
  theme,
}: TextContext) => {
  if (process.env.NODE_ENV !== 'production') {
    maybeWarnAboutNotSupportedProps(props);
  }
  const [textStyle, restProps] = computeTextStyle(theme, props);
  const platformTextStyle = computePlatformTextStyle(textStyle);

  return (
    <Box
      as={as || PlatformText}
      {...restProps}
      style={(theme, boxStyle) => ({
        ...platformTextStyle,
        ...maybeFixFontSmoothing(
          fixFontSmoothing,
          platformTextStyle.color,
          boxStyle.backgroundColor,
        ),
        ...(style && style(theme, platformTextStyle)),
      })}
    />
  );
};

Text.contextTypes = {
  Text: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Text;
