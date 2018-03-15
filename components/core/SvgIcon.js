// @flow
import * as React from 'react';
import Text, { computeFontSizeAndLineHeight, type TextProps } from './Text';
import Theme from './Theme';

//  - flaticon.com
//  - thenounproject.com

export type SvgIconProps = {
  svg: React.Element<any>,
} & TextProps;

class SvgIcon extends React.PureComponent<SvgIconProps> {
  render() {
    return (
      <Theme>
        {theme => {
          const {
            svg,
            color = theme.text.color,
            size = 0,
            style,
            ...props
          } = this.props;
          const { fontSize, lineHeight } = computeFontSizeAndLineHeight(
            theme,
            size,
          );
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
        }}
      </Theme>
    );
  }
}

export default SvgIcon;
