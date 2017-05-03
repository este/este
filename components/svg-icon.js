// @flow
import Text, { type TextProps } from './text';
import React from 'react';

//  - flaticon.com
//  - thenounproject.com

export type SvgIconProps = TextProps & {
  svg?: React.Element<*>,
};

const SvgIcon = (props: SvgIconProps) => (
  <Text
    style={(theme, mixStyles) => {
      const {
        svg,
        color = theme.text.color,
        size = 0,
        ...restProps
      } = mixStyles(props);
      return {
        as: props => React.cloneElement(svg, props),
        color,
        size,
        ...restProps,
        rawStyle: {
          verticalAlign: 'middle',
          fill: theme.colors[color],
          height: theme.typography.fontSize(size),
          width: theme.typography.fontSize(size),
        },
      };
    }}
  />
);

export default SvgIcon;
