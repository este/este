// @flow
import type { Color, Theme } from '../themes/types';
import PropTypes from 'prop-types';
import React from 'react';

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

const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative'; // eslint-disable-line no-undef

// If value is typeof === 'number' then it's multiplied by rhythm constant.
type MaybeRhythmProp = number | string;

type TransformableBoxProps = {
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

export type BoxProps = TransformableBoxProps & {
  as?: () => React.Element<*>,
  style?: (theme: Theme) => BoxProps,
  universalStyle?: Object,
  browserStyle?: Object,
  nativeStyle?: Object,
};

type BoxContext = {
  renderer: { renderRule: () => Object },
  theme: Theme,
};

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

const shorthandTransformation = shorthand => {
  const StyleProps = {
    shorthand: ['Bottom', 'Left', 'Top', 'Right'],
    horizontal: ['Left', 'Right'],
    vertical: ['Bottom', 'Top'],
  };
  const DirectionShorthands = {
    Left: shorthand + 'Horizontal',
    Right: shorthand + 'Horizontal',
    Bottom: shorthand + 'Vertical',
    Top: shorthand + 'Vertical',
  };
  const canSetDirectionShorthand = (props, direction) =>
    props[DirectionShorthands[direction]] === undefined;
  // margin doesn't override marginVertical
  // marginVertical doesn't override marginTop
  const maybeSet = (props, prop, value, styleProps) => {
    const isShorthand = prop === shorthand;
    const style = styleProps.reduce((style, direction) => {
      const stylePropName = shorthand + direction;
      const canSetProp = props[stylePropName] === undefined;
      const canSet =
        canSetProp &&
        (!isShorthand || canSetDirectionShorthand(props, direction));
      if (!canSet) return style;
      return { ...style, [stylePropName]: value };
    }, {});
    return { style };
  };
  return (props, prop, value) => {
    switch (prop) {
      case shorthand:
        return maybeSet(props, prop, value, StyleProps.shorthand);
      case shorthand + 'Horizontal':
        return maybeSet(props, prop, value, StyleProps.horizontal);
      case shorthand + 'Vertical':
        return maybeSet(props, prop, value, StyleProps.vertical);
      default:
        return { style: { [prop]: value } };
    }
  };
};

// const justValueTransformation = (props, prop, value) => ({ style: {} }),

type Transformations = {
  [prop: string]: (
    props: TransformableBoxProps,
    prop: $Keys<TransformableBoxProps>,
    value: mixed
  ) => {| style?: Object, props?: Object |},
};

const transformations: Transformations = {
  margin: shorthandTransformation('margin'),
  marginHorizontal: shorthandTransformation('margin'),
  marginVertical: shorthandTransformation('margin'),
  marginBottom: shorthandTransformation('margin'),
  marginLeft: shorthandTransformation('margin'),
  marginRight: shorthandTransformation('margin'),
  marginTop: shorthandTransformation('margin'),
  padding: shorthandTransformation('padding'),
  paddingHorizontal: shorthandTransformation('padding'),
  paddingVertical: shorthandTransformation('padding'),
  paddingBottom: shorthandTransformation('padding'),
  paddingLeft: shorthandTransformation('padding'),
  paddingRight: shorthandTransformation('padding'),
  paddingTop: shorthandTransformation('padding'),
  height: (props, prop, value) => ({ style: {} }),
  minHeight: (props, prop, value) => ({ style: {} }),
  maxHeight: (props, prop, value) => ({ style: {} }),
  width: (props, prop, value) => ({ style: {} }),
  minWidth: (props, prop, value) => ({ style: {} }),
  maxWidth: (props, prop, value) => ({ style: {} }),
  bottom: (props, prop, value) => ({ style: {} }),
  left: (props, prop, value) => ({ style: {} }),
  right: (props, prop, value) => ({ style: {} }),
  top: (props, prop, value) => ({ style: {} }),

  alignItems: (props, prop, value) => ({ style: {} }),
  alignSelf: (props, prop, value) => ({ style: {} }),
  flexBasis: (props, prop, value) => ({ style: {} }),
  flexDirection: (props, prop, value) => ({ style: {} }),
  flexGrow: (props, prop, value) => ({ style: {} }),
  flexShrink: (props, prop, value) => ({ style: {} }),
  flexWrap: (props, prop, value) => ({ style: {} }),
  justifyContent: (props, prop, value) => ({ style: {} }),

  opacity: (props, prop, value) => ({ style: {} }),
  overflow: (props, prop, value) => ({ style: {} }),
  position: (props, prop, value) => ({ style: {} }),
  zIndex: (props, prop, value) => ({ style: {} }),
};

export const computeBoxStyleAndProps = (boxProps: TransformableBoxProps) => {
  let style = {};
  let props = {};
  Object.keys(boxProps).forEach(prop => {
    const value = boxProps[prop];
    const transformation = transformations[prop];
    if (!transformation) {
      props = { ...props, [prop]: value };
      return;
    }
    const transformed = transformation(boxProps, prop, value);
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

  const computed = computeBoxStyleAndProps(restProps);
  // rhythm props
  // compensate

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
