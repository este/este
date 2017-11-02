// @flow
import * as React from 'react';
import Text, { computeFontSizeAndLineHeight, type TextProps } from './Text';
import withTheme from './withTheme';

//  - flaticon.com
//  - thenounproject.com

export type SvgIconProps = {
  svg: React.Element<any>,
} & TextProps;

const SvgIcon = ({
  theme,
  svg,
  color = theme.text.color,
  size = 0,
  style,
  ...props
}) => {
  const { fontSize, lineHeight } = computeFontSizeAndLineHeight(theme, size);
  const top = (lineHeight - fontSize) / 2;

  return (
    <Text
      as={(props: SvgIconProps) => React.cloneElement(svg, props)}
      color={color}
      size={size}
      {...props}
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

const SvgIconWithTheme: React.ComponentType<SvgIconProps> = withTheme(SvgIcon);

export default SvgIconWithTheme;
