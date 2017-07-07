// @flow
import Text, { computeFontSizeAndLineHeight, type TextProps } from './text';
import React, { type Element } from 'react';
import injectTheme, { type ThemeProps } from './inject-theme';

//  - flaticon.com
//  - thenounproject.com

export type SvgIconProps = TextProps & {
  svg: Element<*>,
};

const SvgIcon = (props: SvgIconProps & ThemeProps) => {
  const {
    theme,
    svg,
    color = theme.text.color,
    size = 0,
    ...restProps
  } = props;
  const { fontSize, lineHeight } = computeFontSizeAndLineHeight(theme, size);
  const top = (lineHeight - fontSize) / 2;

  return (
    <Text
      as={props => React.cloneElement(svg, props)}
      color={color}
      size={size}
      {...restProps}
      style={{
        top,
        // backgroundColor: 'rgba(255,0,0,0.4)', // To test centering.
        verticalAlign: 'top', // Must be top to not affect text lineHeight.
        fill: theme.colors[color],
        height: theme.typography.fontSize(size),
        width: theme.typography.fontSize(size),
        ...restProps.style,
      }}
    />
  );
};

export default injectTheme(SvgIcon);
