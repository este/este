// @flow
import type { BoxProps } from './Box';
import type { Theme } from '../themes/types';
import Box from './Box';
import React from 'react';

type Color = 'primary' | 'warning';

type TextProps = BoxProps & {
  bold?: boolean,
  color?: Color,
};

type TextContext = {
  Text: () => React.Element<*>,
  theme: Theme,
};

const textStyle = (theme, {
  bold,
  color,
  ...props
}) => {
  let style = {};
  if (bold) {
    style = { ...style, fontWeight: bold ? String(theme.text.bold) : 'normal' };
  }
  if (color) {
    style = { ...style, color: theme.colors[color] };
  }
  return {
    style,
    props,
  };
};

const Text = ({
  as,
  style,
  ...props
}: TextProps, {
  Text,
  theme,
}: TextContext) => {
  const component = textStyle(theme, props);
  return (
    <Box
      as={as || Text}
      {...component.props}
      style={theme => ({
        ...component.style,
        ...(style && style(theme)),
      })}
    />
  );
};

Text.contextTypes = {
  Text: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Text;
