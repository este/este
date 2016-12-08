/* @flow */
import type { BoxProps } from './Box';
import type {
  Color,
  Size,
  Styled,
  TextDecoration,
  TextTransform,
} from '../themes/types';
import Box from './Box';
import styled from './styled';

export type TextProps = BoxProps & {
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  size?: Size,
  transform?: TextTransform,
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $spread: Box,
  fontFamily: theme.fontFamily,
  lineHeight: theme.lineHeight,
  fontWeight: props.bold ? theme.bold : 'normal',
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  textDecoration: props.decoration || 'none',
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  textTransform: props.transform || 'none',
}));

export default Text;
