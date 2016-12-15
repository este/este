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
};

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
const computeLineHeight = (fontSize, baseline) => {
  const multiplier = Math.ceil(fontSize / baseline);
  return baseline * multiplier;
};

const fontSizeAndLineHeight = (theme, props) => {
  const fontSize = theme.fontSize(props.size || 0);
  const lineHeight = computeLineHeight(fontSize, theme.baseline());
  return {
    fontSize,
    lineHeight: `${lineHeight}px`,
  };
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  ...fontSizeAndLineHeight(theme, props),
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
}));

export default Text;
