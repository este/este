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
  fontSmoothing?: boolean,
};

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
const rhythmLineHeight = (fontSize, baseline) => {
  const lines = Math.ceil(fontSize / baseline);
  return baseline * lines;
};

const fontSizeAndLineHeight = (theme, props) => {
  const fontSize = theme.typography.fontSize(props.size || 0);
  const lineHeight = rhythmLineHeight(fontSize, theme.typography.lineHeight);
  return {
    fontSize,
    lineHeight: `${lineHeight}px`,
  };
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// So we are use it only for elements with light text and dark background.
const fontSmoothing = (antialiasing) => {
  if (!antialiasing) return {};
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
  ...fontSizeAndLineHeight(theme, props),
  ...fontSmoothing(props.fontSmoothing),
}), 'span');

export default Text;
