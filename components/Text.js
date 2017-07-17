// @flow
import type { Color, Theme } from '../themes/types';
import Box, { type BoxProps } from './Box';
import colorLib from 'color';
import withTheme, { type ThemeContext } from './withTheme';

/*
  Text is the basic UI primitive for all text components.
    Text -> Heading
    Text -> Button
    Text -> TextInput
    etc.
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

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
export const computeFontSizeAndLineHeight = (
  { typography }: Theme,
  size: number,
) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

// http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on a dark background.
const fixBrowserFontSmoothing = (color, backgroundColor) => {
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

const emulateReactNative = (theme, style, backgroundColor) => ({
  ...{
    display: 'inline',
    // https://github.com/Microsoft/reactxp/blob/328a54affdd573aa99b348e5b60e65e3d4ba57a3/src/web/Text.tsx#L24
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    msHyphens: 'auto',
  },
  ...(backgroundColor
    ? fixBrowserFontSmoothing(style.color, theme.colors[backgroundColor])
    : null),
  ...style,
  lineHeight: `${style.lineHeight}px`, // browser needs px
});

const Text = (props: TextProps, { theme }: ThemeContext) => {
  const {
    align,
    bold,
    color = theme.text.color,
    decoration,
    fontFamily = theme.text.fontFamily,
    italic,
    lineHeight,
    size = 0,
    ...restProps
  } = props;

  let style = {
    color: theme.colors[color],
    fontFamily,
    ...computeFontSizeAndLineHeight(theme, size),
    ...(align ? { textAlign: align } : null),
    ...(bold ? { fontWeight: theme.text.bold } : null),
    ...(decoration ? { textDecoration: decoration } : null),
    ...(italic ? { fontStyle: 'italic' } : null),
    ...(lineHeight ? { lineHeight } : null),
    ...restProps.style,
  };

  if (!restProps.isReactNative) {
    style = emulateReactNative(theme, style, restProps.backgroundColor);
  }

  return <Box {...restProps} style={style} />;
};

withTheme(Text);

export default Text;
