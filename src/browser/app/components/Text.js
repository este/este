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
  size?: number,
  transform?: TextTransform,
  // Custom stuff.
  doNotFixFontSmoothing?: boolean,
  // TODO: Finish
  outline?: boolean,
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only on the light text on the dark background.
const maybeFixFontSmoothing = doNotFixFontSmoothing => style => {
  if (doNotFixFontSmoothing) return style;
  const hasColorAndBackgroundColor = style.color && style.backgroundColor;
  // TODO: Check if color is brighter than backgroundColor or use theme flag.
  if (!hasColorAndBackgroundColor) return style;
  return {
    ...style,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const fontSizeAndLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size || 0);
  // inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = typography.lineHeight * lines;
  return { fontSize, lineHeight: `${lineHeight}px` };
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  $map: maybeFixFontSmoothing(props.doNotFixFontSmoothing),
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
  ...fontSizeAndLineHeight(theme.typography, props.size),
}), 'span');

export default Text;
