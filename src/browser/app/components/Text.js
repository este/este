/* @flow */
import type { BoxProps } from './Box';
import type {
  Color,
  Styled,
  TextAlign,
  TextDecoration,
  TextTransform,
} from '../themes/types';
import Box from './Box';
import styled from './styled';

export type TextProps = BoxProps & {
  // The lowest common denominator of:
  //  w3schools.com/css/css_text.asp
  //  facebook.github.io/react-native/releases/0.39/docs/text.html#text
  align?: TextAlign,
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  fontFamily?: string,
  size?: number,
  transform?: TextTransform,
  // Custom stuff.
  doNotFixFontSmoothing?: boolean,
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only on the light text on the dark background.
const maybeFixFontSmoothing = doNotFixFontSmoothing => style => {
  if (doNotFixFontSmoothing) return style;
  const hasColorAndBackgroundColor =
    style.color &&
    style.backgroundColor && style.backgroundColor !== 'transparent';
  // TODO: Check if color is brighter than backgroundColor or use theme flag.
  if (!hasColorAndBackgroundColor) return style;
  return {
    ...style,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const fontSizeAndLineHeight = (typography, size: number) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = typography.lineHeight * lines;
  return { fontSize, lineHeight: `${lineHeight}px` };
};

const Text: Styled<TextProps> = styled((theme, {
  align = 'left',
  bold = false,
  color = 'black',
  decoration = 'none',
  display = 'inline',
  doNotFixFontSmoothing,
  fontFamily = theme.text.fontFamily,
  size = 0,
  transform = 'none',
}) => ({
  $extends: Box,
  $map: maybeFixFontSmoothing(doNotFixFontSmoothing),
  color: theme.colors[color],
  display,
  fontFamily,
  fontWeight: bold ? theme.text.bold : 'normal',
  textAlign: align,
  textDecoration: decoration,
  textTransform: transform,
  ...fontSizeAndLineHeight(theme.typography, size),
}), 'span');

export default Text;
