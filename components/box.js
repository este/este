// @flow
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';
import React from 'react';
import { reject, isNil, map } from 'ramda';

/*
  Box is the basic UI building block with typed and themed styles.
    Box -> Container
    Box -> Header
    Box -> Text
    Box -> Text -> Heading
    Box -> Text -> Input

  Box picks universal styles and props, and pass the rest.
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

  Box supports ad-hoc (unchecked) universal, browser, and native styles.
    <Box browserStyle={theme => ({ whateverFelaSupport: ... })} />
    <Box style={theme => ({
      universalStyle: ... })}
      nativeStyle: ... })}
    />

  We can style any component via as property.
    <Box as={Slider} {...props} />

  And more, for example: vertical rhythm, font smoothing, etc.
*/

type MaybeRhythmProp = number | string;

export type BoxProps = {
  as?: () => React.Element<*>,
  style?: (theme: Theme) => BoxProps,
  universalStyle?: Object,
  browserStyle?: Object,
  nativeStyle?: Object,

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
  renderer: { renderRule: () => Object },
  theme: Theme,
};

type Transformations = {
  [prop: string]: (
    theme: Theme,
    props: BoxProps,
    prop: $Keys<BoxProps>,
    value: mixed
  ) => {| style?: Object, props?: Object |},
};

const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative'; // eslint-disable-line no-undef

const applyStylePropRecursive = (props, theme) => {
  const {
    universalStyle,
    browserStyle,
    nativeStyle,
    ...recursiveProps
  } = typeof props.style === 'function'
    ? applyStylePropRecursive(props.style(theme), theme)
    : {};
  return {
    ...props,
    ...recursiveProps,
    universalStyle: { ...props.universalStyle, ...universalStyle },
    browserStyle: { ...props.browserStyle, ...browserStyle },
    nativeStyle: { ...props.nativeStyle, ...nativeStyle },
  };
};

const maybeRhythm = theme => value =>
  (typeof value === 'number' ? theme.typography.rhythm(value) : value);

const createShorthandTransformation = destructure => (theme, props) => {
  const style = map(maybeRhythm(theme), reject(isNil, destructure(props)));
  return { style };
};

const marginTransformation = createShorthandTransformation(({
  margin,
  marginHorizontal = margin,
  marginVertical = margin,
  marginBottom = marginVertical,
  marginLeft = marginHorizontal,
  marginRight = marginHorizontal,
  marginTop = marginVertical,
}) => ({ marginBottom, marginLeft, marginRight, marginTop }));

const paddingTransformation = createShorthandTransformation(({
  padding,
  paddingHorizontal = padding,
  paddingVertical = padding,
  paddingBottom = paddingVertical,
  paddingLeft = paddingHorizontal,
  paddingRight = paddingHorizontal,
  paddingTop = paddingVertical,
}) => ({ paddingBottom, paddingLeft, paddingRight, paddingTop }));

const maybeRhythmTransformation = (theme, props, prop, value) => ({
  style: { [prop]: maybeRhythm(theme)(value) },
});

const justValueTransformation = (theme, props, prop, value) => ({
  style: { [prop]: value },
});

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
  flexBasis: justValueTransformation,
  flexDirection: justValueTransformation,
  flexGrow: justValueTransformation,
  flexShrink: justValueTransformation,
  flexWrap: justValueTransformation,
  justifyContent: justValueTransformation,

  opacity: justValueTransformation,
  overflow: justValueTransformation,
  position: justValueTransformation,
  zIndex: justValueTransformation,
};

export const computeBoxStyleAndProps = (theme: Theme, boxProps: BoxProps) => {
  let style = {};
  let props = {};
  Object.keys(boxProps).forEach(prop => {
    const value = boxProps[prop];
    const transformation = transformations[prop];
    if (!transformation) {
      props = { ...props, [prop]: value };
      return;
    }
    // TODO: Skip already processed shorthands.
    // if (transformation === marginTransformation) ...
    const transformed = transformation(theme, boxProps, prop, value);
    if (transformed.style) style = { ...style, ...transformed.style };
    if (transformed.props) props = { ...props, ...transformed.props };
  });
  return { style, props };
};

const Box = (props: BoxProps, { renderer, theme }: BoxContext) => {
  const {
    as,
    style,
    universalStyle,
    browserStyle,
    nativeStyle,
    ...restProps
  } = applyStylePropRecursive(props, theme);

  const computed = computeBoxStyleAndProps(theme, restProps);

  const className = renderer.renderRule(() => ({
    ...computed.style,
    ...universalStyle,
    ...(isReactNative ? nativeStyle : browserStyle),
  }));

  return <div {...computed.props} className={className} />;
};

Box.contextTypes = {
  renderer: PropTypes.object,
  theme: PropTypes.object,
};

export default Box;
