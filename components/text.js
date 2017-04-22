// @flow
import type { Color, Theme } from '../themes/types';
import Box, { type BoxProps } from './box';
import colorLib from 'color';

/*
  Text is the basic UI primitive for all text based elements.
    Text -> Heading
    Text -> Button
    Text -> Input
*/

export type TextProps = BoxProps & {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: Color,
  decoration?: 'none' | 'underline' | 'line-through',
  fontFamily?: string,
  italic?: boolean,
  lineHeight?: number,
  size?: number,
  // TODO: shadowColor, shadowOffset, shadowRadius.
};

const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative'; // eslint-disable-line no-undef

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const computeFontSizeAndLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

// http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on a dark background.
const fixFontSmoothing = (color, backgroundColor) => {
  const hasColorAndBackgroundColor =
    color !== 'transparent' && backgroundColor !== 'transparent';
  if (!hasColorAndBackgroundColor) return null;
  const colorIsLighterThanBackgroundColor =
    colorLib(color).luminosity() > colorLib(backgroundColor).luminosity();
  if (!colorIsLighterThanBackgroundColor) return null;
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const emulateReactNativeStyle = (theme, rawStyle, { backgroundColor }) => ({
  ...rawStyle,
  ...(theme.text.rawStyle.fixFontSmoothing && backgroundColor
    ? fixFontSmoothing(rawStyle.color, theme.colors[backgroundColor])
    : null),
  lineHeight: `${rawStyle.lineHeight}px`, // browser needs px
});

export const computeStyle = (
  props: TextProps,
  { isReactNative }: { isReactNative: boolean }
) => (theme: Theme, mixStyles: Object => TextProps) => {
  const {
    align,
    bold,
    color = theme.text.color,
    decoration,
    fontFamily = theme.text.fontFamily,
    italic,
    lineHeight,
    size = 0,
    rawStyle: propsRawStyle,
    ...restProps
  } = mixStyles(props);

  let rawStyle = {
    color: theme.colors[color],
    display: 'inline', // React Native default Text display value.
    // https://github.com/Microsoft/reactxp/blob/328a54affdd573aa99b348e5b60e65e3d4ba57a3/src/web/Text.tsx#L24
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    msHyphens: 'auto',
    fontFamily,
    ...computeFontSizeAndLineHeight(theme.typography, size),
    ...(align ? { textAlign: align } : null),
    ...(bold ? { fontWeight: theme.text.bold } : null),
    ...(decoration ? { textDecoration: decoration } : null),
    ...(italic ? { fontStyle: 'italic' } : null),
    ...(lineHeight ? { lineHeight } : null),
    ...propsRawStyle,
  };

  if (!isReactNative) {
    rawStyle = emulateReactNativeStyle(theme, rawStyle, restProps);
  }
  return { ...restProps, rawStyle };
};

const Text = (props: TextProps) => (
  <Box style={computeStyle(props, { isReactNative })} />
);

export default Text;
