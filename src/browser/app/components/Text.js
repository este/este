/* @flow */
import type { BoxProps } from './Box';
import type {
  Color,
  Size,
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
  lineHeight?: number,
  size?: Size,
  transform?: TextTransform,
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  lineHeight: props.lineHeight || theme.text.lineHeight,
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
}));

export default Text;
