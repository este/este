// @flow
import type { Color } from '../themes/types';
import Box, { type BoxProps } from './box';
import colorLib from 'color';

/*
  Text is the basic UI primitive for all text based elements.
    Text -> Heading
    Text -> Button
    Text -> Input

  Text works like React Native Text even in the browser.
    facebook.github.io/react-native/releases/0.43/docs/text.html#containers
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

// http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/
// tldr; Fix font smoothing only for light text on dark background.
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

const browserify = (theme, rawStyle, { backgroundColor }) => ({
  ...rawStyle,
  ...(theme.text.rawStyle.fixFontSmoothing && backgroundColor
    ? fixFontSmoothing(rawStyle.color, theme.colors[backgroundColor])
    : null),
  lineHeight: `${rawStyle.lineHeight}px`, // browser needs px
});

const Text = (props: TextProps) => (
  <Box
    style={theme => {
      const {
        align,
        bold,
        color = theme.text.color,
        decoration,
        fontFamily = theme.text.fontFamily,
        italic,
        lineHeight,
        size = 0,
        ...boxProps
      } = props;

      const rawStyle = {
        color: theme.colors[color],
        fontFamily,
        ...computeFontSizeAndLineHeight(theme.typography, size),
        ...(align ? { textAlign: align } : null),
        ...(bold ? { fontWeight: theme.text.bold } : null),
        ...(decoration ? { textDecoration: decoration } : null),
        ...(italic ? { fontStyle: 'italic' } : null),
        ...(lineHeight ? { lineHeight } : null),
        // Mimic React Native Text behavior. We can use context as well.
        // facebook.github.io/react-native/releases/0.43/docs/text.html#containers
        '> *': { display: 'inline' },
      };

      return {
        ...boxProps,
        rawStyle: isReactNative
          ? rawStyle
          : browserify(theme, rawStyle, boxProps),
      };
    }}
  />
);

export default Text;
