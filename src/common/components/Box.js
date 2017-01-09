// @flow
import type { Theme } from '../themes/types';
import React from 'react';

export type BoxProps = {
  as?: () => React.Element<*>, // sitr.us/2017/01/03/flow-cookbook-react.html
  style?: (theme: Theme) => Object, // Must be function, Object | ... breaks autocomplete.
  marginLeft?: number,
  marginRight?: number,
};

type BoxContext = {
  View: () => React.Element<*>,
  renderer: any,
  theme: Theme,
};

const boxStyle = (theme, {
  marginLeft,
  marginRight,
  ...props
}) => {
  let style = {};
  if (marginLeft) {
    style = {
      ...style,
      marginLeft: theme.typography.rhythm(marginLeft),
    };
  }
  if (marginRight) {
    style = {
      ...style,
      marginRight: theme.typography.rhythm(marginRight),
    };
  }
  return {
    style,
    props,
  };
};

const Box = ({
  as,
  style,
  ...props
}: BoxProps, {
  View,
  renderer,
  theme,
}: BoxContext) => {
  const Component = as || View;
  const component = boxStyle(theme, props);
  return (
    <Component
      {...component.props}
      // TODO: Make it universal.
      style={renderer.renderRule(() => ({
        ...component.style,
        ...(style && style(theme)),
      }))}
    />
  );
};

Box.contextTypes = {
  View: React.PropTypes.func,
  renderer: React.PropTypes.object,
  theme: React.PropTypes.object,
};

export default Box;
