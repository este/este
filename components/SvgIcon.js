// @flow
import React, { type Element } from 'react';
import Text, { computeFontSizeAndLineHeight, type TextProps } from './Text';
import withTheme, { type ThemeContext } from './withTheme';

//  - flaticon.com
//  - thenounproject.com

export type SvgIconProps = {
  svg: Element<any>,
} & TextProps;

const SvgIcon = (props: SvgIconProps, { theme }: ThemeContext) => {
  const {
    svg,
    color = theme.text.color,
    size = 0,
    style,
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
        ...style,
      }}
    />
  );
};

withTheme(SvgIcon);

export default SvgIcon;
