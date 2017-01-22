// @flow
import type { Color, Theme } from '../themes/types';
import React from 'react';
import isReactNative from '../../common/app/isReactNative';

// Universal styled Box component. The same API for browsers and React Native.
// Some props are ommited or limited or set to match React Native behaviour.
//  - display is always set to flex
//  - default position is relative
//  - default flex direction is column
// Use style prop for platform specific styling.
// For example:
//  style={theme => ({
//    // Set borderTopWidth to 1 to componsate padding.
//    borderTopWidth: StyleSheet.hairlineWidth,
//  })}
// For RN backgroundColor with borderRadius, sometimes we need overflow="hidden"

export type BoxProps = {
  as?: () => React.Element<*>, // sitr.us/2017/01/03/flow-cookbook-react.html
  style?: (theme: Theme, style?: Object) => Object, // Low level deliberately not typed.

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
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  flexBasis?: number | string,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
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

const setBorderTryEnsureRhythmWithPadding = (
  style,
  borderWidthProps,
  borderWidth,
) => {
  const borderWidthIsDefined = typeof borderWidth === 'number';
  for (const prop in borderWidthProps) { // eslint-disable-line guard-for-in, no-restricted-syntax
    const propValue = borderWidthProps[prop];
    const propIsDefined = typeof propValue === 'number';
    if (!borderWidthIsDefined && !propIsDefined) continue; // eslint-disable-line no-continue
    const paddingProp =
      prop === 'borderBottomWidth' ? 'paddingBottom' :
      prop === 'borderLeftWidth' ? 'paddingLeft' :
      prop === 'borderRightWidth' ? 'paddingRight' : 'paddingTop';
    // $FlowFixMe We know prop could not be found, we check it.
    const paddingValue = style[paddingProp];
    // We can't compensate string padding.
    if (typeof paddingValue === 'string') {
      continue; // eslint-disable-line no-continue
    }
    const borderValue = propIsDefined ? propValue : borderWidth;
    // $FlowFixMe Yes, we know it.
    const compensatedPaddingValue = paddingValue - borderValue;
    const canCompensate = compensatedPaddingValue >= 0;
    if (!canCompensate) {
      style = {
        ...style,
        [prop]: propValue,
      };
      // TODO: Put warning back, allow to disable it.
      // if (process.env.NODE_ENV !== 'production') {
      //   console.warn([ // eslint-disable-line no-console
      //     `Please increase ${paddingProp} for ${prop} to ensure rhythm, `,
      //     'or use style.',
      //   ].join(''));
      // }
      continue; // eslint-disable-line no-continue
    }
    style = {
      ...style,
      [paddingProp]: canCompensate ? compensatedPaddingValue : paddingValue,
      [prop]: propValue,
    };
  }
  return style;
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

  flex,
  backgroundColor,

  // Border props.
  borderBottomColor,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderBottomWidth,
  borderColor,
  borderLeftColor,
  borderLeftWidth,
  borderRadius,
  borderRightColor,
  borderRightWidth,
  borderStyle,
  borderTopColor,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderTopWidth,
  borderWidth,

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
  let style = isReactNative ? {} : {
    // Enforce React Native behaviour for browsers.
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
  };

  // Do not sort, margin can be overridden by marginHorizontal etc.
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

  for (const prop in maybeRhythmProps) { // eslint-disable-line guard-for-in, no-restricted-syntax
    const value = maybeRhythmProps[prop];
    const isNumber = typeof value === 'number';
    const isDefined = isNumber || value;
    if (!isDefined) continue; // eslint-disable-line no-continue
    const computedValue = isNumber ? theme.typography.rhythm(value) : value;
    switch (prop) {
      case 'margin':
        style = {
          ...style,
          // Split to be computable.
          marginBottom: computedValue,
          marginLeft: computedValue,
          marginRight: computedValue,
          marginTop: computedValue,
        };
        break;
      case 'marginHorizontal':
        style = { ...style, marginLeft: computedValue, marginRight: computedValue };
        break;
      case 'marginVertical':
        style = { ...style, marginTop: computedValue, marginBottom: computedValue };
        break;
      case 'padding':
        style = {
          ...style,
          // Split to be computable.
          paddingBottom: computedValue,
          paddingLeft: computedValue,
          paddingRight: computedValue,
          paddingTop: computedValue,
        };
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
    // Do not sort.
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
  };

  for (const prop in colorProps) { // eslint-disable-line guard-for-in, no-restricted-syntax
    const value = colorProps[prop];
    if (!value) continue; // eslint-disable-line no-continue
    style = { ...style, [prop]: theme.colors[value] };
  }

  const borderWidthProps = {
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
  };

  style = setBorderTryEnsureRhythmWithPadding(
    style,
    borderWidthProps,
    borderWidth,
  );

  // Just value props.
  const justValueProps = {
    // Do not sort, borderRadius must be before borderXYRadius.
    borderRadius,
    borderStyle,
    borderWidth,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
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

  for (const prop in justValueProps) { // eslint-disable-line guard-for-in, no-restricted-syntax
    const value = justValueProps[prop];
    const isDefined = typeof value === 'number' || value;
    if (!isDefined) continue;  // eslint-disable-line no-continue
    style = { ...style, [prop]: value };
  }

  return [style, props];
};

const Box = ({
  as,
  style,
  ...props
}: BoxProps, { // Note no $Exact<BoxProps>. It's up to the rendered component.
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
        ...(style && style(theme, boxStyle)),
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
