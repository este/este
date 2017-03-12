// @flow
import type { Color, Theme } from '../themes/types';
import React from 'react';
import isReactNative from '../../common/app/isReactNative';

// Universal styled Box component. The same API for browsers and React Native.
// Some props are ommited or limited or set to match React Native behaviour.
//  - default display is flex
//  - default position is relative
//  - default flexDirection is column
// We can use style prop for platform specific styling.
//  style={theme => ({
//    // Set borderTopWidth to 1 to componsate padding.
//    borderTopWidth: StyleSheet.hairlineWidth,
//  })}

export type BoxProps = {
  // sitr.us/2017/01/03/flow-cookbook-react.html
  as?: () => React.Element<*>,
  // Low level deliberately not typed.
  style?: (theme: Theme, style: Object) => Object,
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
  flex?: number,
  backgroundColor?: Color,
  // Border props.
  borderBottomColor?: Color,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderBottomWidth?: number,
  borderColor?: Color,
  borderLeftColor?: Color,
  borderLeftWidth?: number,
  borderRadius?: number,
  borderRightColor?: Color,
  borderRightWidth?: number,
  borderStyle?: 'solid' | 'dotted' | 'dashed',
  borderTopColor?: Color,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderTopWidth?: number,
  borderWidth?: number,
  // Just value props.
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline',
  flexBasis?: number | string,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around',
  opacity?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  position?: 'absolute' | 'relative',
  zIndex?: number,
};

type BoxContext = {
  View: () => React.Element<*>,
  renderer: any, // TODO: Type it.
  theme: Theme,
};

const setBorderTryEnsureRhythmViaPadding = (style, borderWidthProps) => {
  Object.keys(borderWidthProps).forEach(borderWidthProp => {
    const borderWidthPropValue = borderWidthProps[borderWidthProp];
    if (typeof borderWidthPropValue !== 'number') return;
    style = { ...style, [borderWidthProp]: borderWidthPropValue };
    const paddingProp = borderWidthProp === 'borderBottomWidth'
      ? 'paddingBottom'
      : borderWidthProp === 'borderLeftWidth'
          ? 'paddingLeft'
          : borderWidthProp === 'borderRightWidth'
              ? 'paddingRight'
              : 'paddingTop';
    const paddingPropValue = style[paddingProp];
    if (typeof paddingPropValue !== 'number') return;
    const compensatedPaddingPropValue = paddingPropValue - borderWidthPropValue;
    const canCompensate = compensatedPaddingPropValue >= 0;
    if (!canCompensate) return;
    style = { ...style, [paddingProp]: compensatedPaddingPropValue };
  });
  return style;
};

const computeBoxStyle = (
  theme,
  {
    // Maybe rhythm props.
    margin,
    marginVertical = margin,
    marginHorizontal = margin,
    marginTop = marginVertical,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    marginRight = marginHorizontal,
    padding,
    paddingVertical = padding,
    paddingHorizontal = padding,
    paddingTop = paddingVertical,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal,
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

    flex,
    backgroundColor,

    // Border props.
    borderColor = 'gray',
    // We can't use borderColor as default because some component in React Native,
    // for example Image, doesn't support that.
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderRadius,
    borderBottomLeftRadius = borderRadius,
    borderBottomRightRadius = borderRadius,
    borderTopLeftRadius = borderRadius,
    borderTopRightRadius = borderRadius,
    borderWidth = 0, // Enfore React Native behaviour. It also makes more sense.
    borderBottomWidth = borderWidth,
    borderLeftWidth = borderWidth,
    borderRightWidth = borderWidth,
    borderTopWidth = borderWidth,
    borderStyle,

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
  },
) => {
  let style = isReactNative
    ? {}
    : {
        // Enforce React Native behaviour for browsers.
        position: 'relative',
        flexDirection: 'column',
        display: 'flex',
      };

  const maybeRhythmProps = {
    bottom,
    height,
    left,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    right,
    top,
    width,
  };

  Object.keys(maybeRhythmProps).forEach(prop => {
    const value = maybeRhythmProps[prop];
    if (typeof value === 'number') {
      style = { ...style, [prop]: theme.typography.rhythm(value) };
    } else if (value) {
      style = { ...style, [prop]: value };
    }
  });

  // Enforce React Native flex behaviour. Can be overridden.
  if (typeof flex === 'number') {
    if (isReactNative) {
      style = { ...style, flex: 1 };
    } else {
      style = { ...style, flexBasis: 'auto', flexGrow: flex, flexShrink: 1 };
    }
  }

  const colorProps = {
    backgroundColor,
    // Do not sort, borderColor shorthand must be set first.
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
  };

  Object.keys(colorProps).forEach(prop => {
    const value = colorProps[prop];
    if (!value) return;
    style = { ...style, [prop]: theme.colors[value] };
  });

  style = setBorderTryEnsureRhythmViaPadding(style, {
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
  });

  // Just value props.
  const justValueProps = {
    alignItems,
    alignSelf,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
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

  Object.keys(justValueProps).forEach(prop => {
    const value = justValueProps[prop];
    const isDefined = typeof value === 'number' || value;
    if (!isDefined) return;
    style = { ...style, [prop]: value };
  });

  return [style, props];
};

const Box = (
  {
    as,
    style,
    ...props
  }: BoxProps,
  {
    // Note no $Exact<BoxProps>. It's up to the rendered component.
    View,
    renderer,
    theme,
  }: BoxContext,
) => {
  const Component = as || View;
  const [boxStyle, restProps] = computeBoxStyle(theme, props);
  const rule = renderer.renderRule(() => ({
    ...boxStyle,
    ...(style && style(theme, boxStyle)),
  }));
  return (
    <Component
      {...restProps}
      {...{ [isReactNative ? 'style' : 'className']: rule }}
    />
  );
};

Box.contextTypes = {
  View: React.PropTypes.func,
  renderer: React.PropTypes.object,
  theme: React.PropTypes.object,
};

export default Box;
