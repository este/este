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
  // Custom
  outline?: boolean,
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only on light text on dark background.
const maybeFixFontSmoothing = ({ backgroundColor }) => {
  // TODO: Compare color and backgroundColor values for black themes.
  if (!backgroundColor || backgroundColor === 'none') return {};
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const maybeOutline = (style, outline) => {
  if (!outline) return {};
  return {
    // backgroundColor: 'none',
    // color: style.backgroundColor || 'black',
    // color: '#000',
    // outline: `solid 1px ${style.backgroundColor}`,
  }
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
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

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  $map: style => ({
    ...style,
    ...maybeFixFontSmoothing(style),
    ...maybeOutline(style, props.outline),
  }),
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
  ...fontSizeAndLineHeight(theme, props),
}), 'span');

export default Text;
