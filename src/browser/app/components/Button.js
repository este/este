// @flow
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import color from 'color';
import styled from './styled';

type ButtonProps = TextProps & {
  active?: boolean,
  disabled?: boolean,
  inline?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const maybeVerticalSpace = size => size >= 0 ? {
  // Button needs vertical space. Sure it can be defined in the theme.
  marginVertical: 0.25,
  paddingVertical: 0.25,
} : {
  // But the smaller button can't have any padding nor border because it would
  // break a rhythm. It's impossible to compute it since text can be multiline.
  borderWidth: 0,
};

const activeStyle = (style, { darken }) => [
  'backgroundColor',
  'borderColor',
].reduce((activeStyle, prop) => {
  const value = activeStyle[prop];
  if (!value) return activeStyle;
  return {
    ...activeStyle,
    [prop]: color(value).darken(darken).hsl().string(),
  };
}, style);

const Button: Styled<ButtonProps> = styled((theme, {
  active,
  bold = true,
  disabled,
  display = 'inline-block',
  inline,
  paddingHorizontal = 0.8,
  size = 0,
  transform = 'capitalize',
}) => ({
  $extends: [Text, ({
    bold,
    display,
    paddingHorizontal,
    transform,
    ...(inline ? {} : maybeVerticalSpace(size)),
  }: Strict<TextProps>)],
  $map: style => {
    if (!active) return style;
    return activeStyle(style, theme.states.active);
  },
  userSelect: 'none', // Because button is rendered as a div in the browser.
  ...(disabled ? theme.states.disabled : null),
}), 'button', [
  'disabled',
  'onClick',
]);

export default Button;
