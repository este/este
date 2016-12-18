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
  antialiasing?: boolean,
  // The lowest common denominator of:
  //  w3schools.com/css/css_text.asp
  //  facebook.github.io/react-native/releases/0.39/docs/text.html#text
  align?: TextAlign,
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  size?: number,
  transform?: TextTransform,
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

const fontSmoothing = (antialiasing) => {
  // usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
  if (!antialiasing) return {};
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  ...fontSizeAndLineHeight(theme, props),
  ...fontSmoothing(props.antialiasing),
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
}), 'span');

export default Text;
