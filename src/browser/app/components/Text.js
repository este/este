/* @flow */
import type {
  Color,
  Size,
  Styled,
  TextDecoration,
  TextTransform,
} from '../themes/types';
import styled from './styled';

export type TextProps = {
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  size?: Size,
  transform?: TextTransform,
};

const Text: Styled<TextProps> = styled((props, theme) => ({
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  fontFamily: theme.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
}));

export default Text;
