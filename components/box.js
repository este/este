// @flow
import type { Color, Theme } from '../themes/types';
import PropTypes from 'prop-types';
import React from 'react';
import { reject, isNil, map } from 'ramda';

/*
  Box is thin abstraction for universal, styled, typed, and themed components.
    Box - Container
    Box - Header
    Box - Text
    Box - Text - Heading
    Box - Text - Input

  Box picks props to handle, and pass the rest. No white/black listing.
    <Box
      width="10%" // width is an universal style prop
      onTouch={onBoxTouch} // onClick in a browser
      onUnsupportedProp={...} // Box will pass prop to underlying component.
    />

  Some Box styles are restricted to or leverage theme constants.
    <Box
      backgroundColor="primary" // theme.colors.primary
      padding={1} // theme.typography.rhythm(n)
    />
    <Container style={theme => ({ padding: theme.container.padding })} />

  Box supports any platform styles via rawStyle to bypass type checking.
    <Box rawStyle={theme => ({ whateverFelaOrReactNativeSupport: ... })} />
    <Box style={theme => ({
      margin: 1, // style prop
      rawStyle: whateverFelaOrReactNativeSupport
    })}/>

  We can style any component via as property.
    <Box as={Slider} {...props} />

  Box enforces vertical rhythm with borders via padding compensation.

  Box styles follow https://facebook.github.io/yoga capabilities. For browser,
  we restrict styles to enforce the same behaviour.

  For minimal builds, we recommend to use box.js, box.ios.js, etc.

  Flow Theme type should be the same for all platforms to help maintenance.

  For an inspiration:
    https://github.com/react-native-community/react-native-elements
    https://jxnblk.com/rebass
    https://vuetifyjs.com
    https://github.com/airyland/vux
    https://material-ui.com

  TODO:
    - transform: https://microsoft.github.io/reactxp/docs/styles.html
    - maybe, handle View in Text https://github.com/Microsoft/reactxp/blob/762abbe7450501fc6b1088d55ef5539dd51ff223/src/web/utils/restyleForInlineText.tsx
*/

type MaybeRhythmProp = number | string;

export type BoxProps = {
  as?: () => React.Element<*>,
  style?: (theme: Theme) => $Exact<BoxProps>,
  rawStyle?: Object,

  margin?: MaybeRhythmProp,
  marginHorizontal?: MaybeRhythmProp,
  marginVertical?: MaybeRhythmProp,
  marginBottom?: MaybeRhythmProp,
  marginLeft?: MaybeRhythmProp,
  marginRight?: MaybeRhythmProp,
  marginTop?: MaybeRhythmProp,
  padding?: MaybeRhythmProp,
  paddingHorizontal?: MaybeRhythmProp,
  paddingVertical?: MaybeRhythmProp,
  paddingBottom?: MaybeRhythmProp,
  paddingLeft?: MaybeRhythmProp,
  paddingRight?: MaybeRhythmProp,
  paddingTop?: MaybeRhythmProp,
  height?: MaybeRhythmProp,
  minHeight?: MaybeRhythmProp,
  maxHeight?: MaybeRhythmProp,
  width?: MaybeRhythmProp,
  minWidth?: MaybeRhythmProp,
  maxWidth?: MaybeRhythmProp,
  bottom?: MaybeRhythmProp,
  left?: MaybeRhythmProp,
  right?: MaybeRhythmProp,
  top?: MaybeRhythmProp,

  // Flexbox. Only what's compatible with React Native.
  // github.com/facebook/react-native/blob/master/Libraries/StyleSheet/LayoutPropTypes.js
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline',
  flex?: number,
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

  backgroundColor?: Color,
  opacity?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  position?: 'absolute' | 'relative',
  zIndex?: number,
  borderStyle?: 'solid' | 'dotted' | 'dashed',

  borderWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  borderRightWidth?: number,
  borderTopWidth?: number,

  borderRadius?: number,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,

  borderColor?: Color,
  borderBottomColor?: Color,
  borderLeftColor?: Color,
  borderRightColor?: Color,
  borderTopColor?: Color,
};

type BoxContext = {
  renderer: { renderRule: () => Object },
  theme: Theme,
};

type TransformationOptions = {|
  isReactNative: boolean,
  theme: Theme,
|};

type Transformations = {
  [prop: string]: (
    options: TransformationOptions,
    props: BoxProps,
    prop: $Keys<BoxProps>,
    value: any
  ) => {| style?: Object, props?: Object |},
};

const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative'; // eslint-disable-line no-undef

const applyStylePropRecursive = (props, theme) => {
  const { rawStyle, ...recursiveProps } = typeof props.style === 'function'
    ? applyStylePropRecursive(props.style(theme), theme)
    : {};
  return {
    ...props,
    ...recursiveProps,
    rawStyle: { ...props.rawStyle, ...rawStyle },
  };
};

const maybeRhythm = theme => value =>
  (typeof value === 'number' ? theme.typography.rhythm(value) : value);

const createShorthandTransformation = destructure => (options, props) => ({
  style: reject(isNil, destructure(props)),
});

const createMaybeRhythmShorthandTransformation = destructure => (
  options,
  props
) => ({
  style: map(
    maybeRhythm(options.theme),
    createShorthandTransformation(destructure)(options, props).style
  ),
});

const marginTransformation = createMaybeRhythmShorthandTransformation(
  ({
    margin,
    marginHorizontal = margin,
    marginVertical = margin,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    marginRight = marginHorizontal,
    marginTop = marginVertical,
  }) => ({ marginBottom, marginLeft, marginRight, marginTop })
);

const paddingTransformation = createMaybeRhythmShorthandTransformation(
  ({
    padding,
    paddingHorizontal = padding,
    paddingVertical = padding,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal,
    paddingTop = paddingVertical,
  }) => ({ paddingBottom, paddingLeft, paddingRight, paddingTop })
);

const createColorShorthandTransformation = destructure => (options, props) => ({
  style: map(
    value => options.theme.colors[value],
    createShorthandTransformation(destructure)(options, props).style
  ),
});

const maybeRhythmTransformation = ({ theme }, props, prop, value) => ({
  style: { [prop]: maybeRhythm(theme)(value) },
});

const justValueTransformation = (options, props, prop, value) => ({
  style: { [prop]: value },
});

// https://github.com/necolas/react-native-web expandStyle-test.js
const flexTransformation = ({ isReactNative }, props, prop, value) => {
  if (value < 1) throw new Error('Not implemented yet');
  const { flexBasis = 'auto', flexShrink = 1 } = props;
  return {
    style: isReactNative
      ? { [prop]: value }
      : { flexBasis, flexGrow: value, flexShrink },
  };
};

const colorTransformation = ({ theme }, props, prop, value) => ({
  style: { [prop]: theme.colors[value] },
});

const borderWidthTransformation = createShorthandTransformation(
  ({
    borderWidth,
    borderBottomWidth = borderWidth,
    borderLeftWidth = borderWidth,
    borderRightWidth = borderWidth,
    borderTopWidth = borderWidth,
  }) => ({
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
  })
);

const borderRadiusTransformation = createShorthandTransformation(
  ({
    borderRadius,
    borderBottomLeftRadius = borderRadius,
    borderBottomRightRadius = borderRadius,
    borderTopLeftRadius = borderRadius,
    borderTopRightRadius = borderRadius,
  }) => ({
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
  })
);

const borderColorTransformation = createColorShorthandTransformation(
  ({
    borderColor,
    borderBottomColor = borderColor,
    borderLeftColor = borderColor,
    borderRightColor = borderColor,
    borderTopColor = borderColor,
  }) => ({
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
  })
);

const transformations: Transformations = {
  margin: marginTransformation,
  marginHorizontal: marginTransformation,
  marginVertical: marginTransformation,
  marginBottom: marginTransformation,
  marginLeft: marginTransformation,
  marginRight: marginTransformation,
  marginTop: marginTransformation,
  padding: paddingTransformation,
  paddingHorizontal: paddingTransformation,
  paddingVertical: paddingTransformation,
  paddingBottom: paddingTransformation,
  paddingLeft: paddingTransformation,
  paddingRight: paddingTransformation,
  paddingTop: paddingTransformation,

  height: maybeRhythmTransformation,
  minHeight: maybeRhythmTransformation,
  maxHeight: maybeRhythmTransformation,
  width: maybeRhythmTransformation,
  minWidth: maybeRhythmTransformation,
  maxWidth: maybeRhythmTransformation,
  bottom: maybeRhythmTransformation,
  left: maybeRhythmTransformation,
  right: maybeRhythmTransformation,
  top: maybeRhythmTransformation,

  alignItems: justValueTransformation,
  alignSelf: justValueTransformation,
  flex: flexTransformation,
  flexBasis: justValueTransformation,
  flexDirection: justValueTransformation,
  flexGrow: justValueTransformation,
  flexShrink: justValueTransformation,
  flexWrap: justValueTransformation,
  justifyContent: justValueTransformation,

  backgroundColor: colorTransformation,
  opacity: justValueTransformation,
  overflow: justValueTransformation,
  position: justValueTransformation,
  zIndex: justValueTransformation,
  borderStyle: justValueTransformation,

  borderWidth: borderWidthTransformation,
  borderBottomWidth: borderWidthTransformation,
  borderLeftWidth: borderWidthTransformation,
  borderRightWidth: borderWidthTransformation,
  borderTopWidth: borderWidthTransformation,

  borderRadius: borderRadiusTransformation,
  borderBottomLeftRadius: borderRadiusTransformation,
  borderBottomRightRadius: borderRadiusTransformation,
  borderTopLeftRadius: borderRadiusTransformation,
  borderTopRightRadius: borderRadiusTransformation,

  borderColor: borderColorTransformation,
  borderBottomColor: borderColorTransformation,
  borderLeftColor: borderColorTransformation,
  borderRightColor: borderColorTransformation,
  borderTopColor: borderColorTransformation,
};

// Enforce React Native behaviour for browsers.
// TODO: Consider once documented:
// https://github.com/Microsoft/reactxp/blob/328a54affdd573aa99b348e5b60e65e3d4ba57a3/src/web/View.tsx#L24
const browserStyleToEmulateReactNative = {
  display: 'flex', // React Native default View display value.
  flexDirection: 'column', // React Native default flexDirection value.
  position: 'relative', // React Native View has position relative by default.
  overflow: 'hidden', // Android sucks. Google "react native android overflow".
};

export const computeBoxStyleAndProps = (
  boxProps: BoxProps,
  options: TransformationOptions
) => {
  let style = options.isReactNative ? {} : browserStyleToEmulateReactNative;
  let props = {};
  Object.keys(boxProps).forEach(prop => {
    const value = boxProps[prop];
    const transformation = transformations[prop];
    if (!transformation) {
      props = { ...props, [prop]: value };
      return;
    }
    // TODO: Skip already processed shorthands for better performance?
    // if (transformation === marginTransformation) etc.
    const transformed = transformation(options, boxProps, prop, value);
    if (transformed.style) style = { ...style, ...transformed.style };
    if (transformed.props) props = { ...props, ...transformed.props };
  });
  return { style, props };
};

const Box = (props: BoxProps, { renderer, theme }: BoxContext) => {
  const { as, style, rawStyle, ...restProps } = applyStylePropRecursive(
    props,
    theme
  );
  const computed = computeBoxStyleAndProps(restProps, { isReactNative, theme });
  const className = renderer.renderRule(() => ({
    ...computed.style,
    ...rawStyle,
  }));
  return <div {...computed.props} className={className} />;
};

Box.contextTypes = {
  renderer: PropTypes.object,
  theme: PropTypes.object,
};

export default Box;
