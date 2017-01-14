// @flow
import type { Theme } from '../themes/types';
import React from 'react';

// Universal Box style component. The same API for browsers and React Native.
// Some props are ommited or limited to match React Native behaviour.
//  - display is always set to flex
//  - default position is relative
// Use style prop for platform specific styling.

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

export type BoxProps = {
  as?: () => React.Element<*>, // sitr.us/2017/01/03/flow-cookbook-react.html
  style?: (theme: Theme) => Object, // Low level deliberately not typed.

  // Maybe rhythm props.
  margin?: number | string,
  marginHorizontal?: number | string,
  marginVertical?: number | string,
  marginBottom?: number | string,
  marginLeft?: number | string,
  marginRight?: number | string,
  marginTop?: number | string,
  padding?: number | string,
  paddingHorizontal?: number | string,
  paddingVertical?: number | string,
  paddingBottom?: number | string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingTop?: number | string,
  height?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  width?: number | string,
  bottom?: number | string,
  left?: number | string,
  right?: number | string,
  top?: number | string,

  // Just value props.
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  flexBasis?: number | string,
  flexDirection?:  'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  opacity?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  position?: 'absolute' | 'relative',
  zIndex?: number,

  // Computed props.
  // flex?: number,
  // borderWidth
  // borderTopWidth
  // borderRightWidth
  // borderBottomWidth
  // borderLeftWidth
};

type BoxContext = {
  View: () => React.Element<*>,
  renderer: any, // TODO: Type it.
  theme: Theme,
};

const computeBoxStyle = (theme, {
  // Maybe rhythm props.
  margin,
  marginHorizontal,
  marginVertical,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width,
  bottom,
  left,
  right,
  top,

  // Just value props.
  alignItems,
  alignSelf,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  opacity,
  overflow,
  position,
  zIndex,

  ...props
}) => {
  let style = {
    // That's React Native default.
    flexDirection: 'column',
    position: 'relative',
  };
  if (!isReactNative) {
    style = { ...style, display: 'flex' }; // Enforce React Native behaviour.
  }

  // Don't sort it. Margin < marginHorizontal < marginLeft | marginRight.
  const maybeRhythmProps = {
    margin,
    marginHorizontal,
    marginVertical,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    padding,
    paddingHorizontal,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    bottom,
    left,
    right,
    top,
  };

  for (let prop in maybeRhythmProps) {
    const value = maybeRhythmProps[prop];
    const isNumber = typeof value === 'number';
    const isDefined = isNumber || value;
    if (!isDefined) continue;
    const computedValue = isNumber ? theme.typography.rhythm(value) : value;
    switch (prop) {
      case 'marginHorizontal':
        style = { ...style, marginLeft: computedValue, marginRight: computedValue };
        break;
      case 'marginVertical':
        style = { ...style, marginTop: computedValue, marginBottom: computedValue };
        break;
      case 'paddingHorizontal':
        style = { ...style, paddingLeft: computedValue, paddingRight: computedValue };
        break;
      case 'paddingVertical':
        style = { ...style, paddingTop: computedValue, paddingBottom: computedValue };
        break;
      default:
        style = { ...style, [prop]: computedValue };
    }
  }

  const justValueProps = {
    alignItems,
    alignSelf,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    opacity,
    overflow,
    position,
    zIndex,
  };

  for (let prop in justValueProps) {
    const value = justValueProps[prop];
    const isDefined = typeof value === 'number' || value;
    if (!isDefined) continue;
    style = { ...style, [prop]: value };
  }

  // pak border po pixelu, taky string nebo number

  return [style, props];
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
  const [boxStyle, restProps] = computeBoxStyle(theme, props);
  return (
    <Component
      {...restProps}
      // TODO: Add the same logic for browser className.
      style={renderer.renderRule(() => ({
        ...boxStyle,
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
