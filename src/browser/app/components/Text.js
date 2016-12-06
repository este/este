/* @flow */
import type { Color, Size, Style, TextDecoration, TextTransform } from '../themes/types';
import style from './style';

export type TextProps = {
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  size?: Size,
  transform?: TextTransform,
};

const Text: Style<TextProps> = style((props, theme) => ({
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  fontFamily: theme.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
}));

export default Text;
