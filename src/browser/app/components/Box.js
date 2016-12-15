/* @flow */
import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  Color,
  Display,
  FlexDirection,
  FlexFlow,
  FlexWrap,
  JustifyContent,
  Styled,
  TopBottomLeftRight,
} from '../themes/types';
import styled from './styled';
import warning from 'warning';

export type BoxProps = {
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  backgroundColor?: Color,
  border?: true | TopBottomLeftRight,
  borderColor?: Color,
  borderRadius?: number,
  borderWidth?: number,
  display?: Display,
  flex?: number,
  flexBasis?: number | string,
  flexDirection?: FlexDirection,
  flexFlow?: FlexFlow,
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: FlexWrap,
  height?: number | string,
  justifyContent?: JustifyContent,
  margin?: number | string,
  marginBottom?: number | string,
  marginHorizontal?: number | string,
  marginLeft?: number | string,
  marginRight?: number | string,
  marginTop?: number | string,
  marginVertical?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  order?: number,
  padding?: number | string,
  paddingBottom?: number | string,
  paddingHorizontal?: number | string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingTop?: number | string,
  paddingVertical?: number | string,
  style?: any,
  width?: number | string,
  noRhythm?: boolean,
};

const rhythmSizeOrString = (theme, value) =>
  typeof value === 'number'
    ? theme.baseline() * value
    : value;

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const propToStyle = (prop, value: any, theme) => {
  switch (prop) {
    // Simple size props.
    case 'marginBottom':
    case 'marginLeft':
    case 'marginRight':
    case 'marginTop':
    case 'paddingBottom':
    case 'paddingLeft':
    case 'paddingRight':
    case 'paddingTop':
      return {
        [prop]: rhythmSizeOrString(theme, value),
      };
    // Direction shorthand size props.
    case 'marginHorizontal':
    case 'marginVertical':
    case 'paddingHorizontal':
    case 'paddingVertical': {
      const [d1, d2] = directionMapping[prop];
      return {
        [d1]: rhythmSizeOrString(theme, value),
        [d2]: rhythmSizeOrString(theme, value),
      };
    }
    // Split shorthand props to be computable.
    case 'margin': {
      return {
        marginBottom: rhythmSizeOrString(theme, value),
        marginLeft: rhythmSizeOrString(theme, value),
        marginRight: rhythmSizeOrString(theme, value),
        marginTop: rhythmSizeOrString(theme, value),
      };
    }
    case 'padding': {
      return {
        paddingBottom: rhythmSizeOrString(theme, value),
        paddingLeft: rhythmSizeOrString(theme, value),
        paddingRight: rhythmSizeOrString(theme, value),
        paddingTop: rhythmSizeOrString(theme, value),
      };
    }
    // Color props.
    case 'backgroundColor':
      return { backgroundColor: theme.colors[value] };
    // Value props.
    case 'width':
    case 'height':
    case 'maxWidth':
    case 'maxHeight':
    case 'minWidth':
    case 'minHeight':
    case 'display':
    case 'flex':
    case 'flexDirection':
    case 'flexFlow':
    case 'flexGrow':
    case 'flexWrap':
    case 'alignItems':
    case 'alignContent':
    case 'order':
    case 'flexShrink':
    case 'flexBasis':
    case 'alignSelf':
      return { [prop]: value };
    case 'borderRadius':
      return { borderRadius: value || theme.border.radius };
    default:
      return null;
  }
};

const propsToStyle = (theme, props) => Object
  .keys(props)
  .reduce((style, prop) => {
    if (prop === 'theme') return style;
    const propStyle = propToStyle(prop, props[prop], theme);
    if (propStyle === null) return style;
    return { ...style, ...propStyle };
  }, {});

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
const adjustPaddingForRhythm = (noRhythm, border, borderWidth, style) => {
  if (!borderWidth) return {};
  return ['Bottom', 'Left', 'Right', 'Top'].reduce((padding, prop) => {
    const adjust = border === true || border === prop.toLowerCase();
    if (!adjust) return padding;
    const paddingProp = `padding${prop}`;
    const canAdjust = style[paddingProp] && (style[paddingProp] - borderWidth) >= 0;
    if (!canAdjust) {
      if (noRhythm) return {};
      const direction = prop === 'Left' || prop === 'Right'
        ? 'horizontal'
        : 'vertical';
      warning(false, [
        `Please increase ${paddingProp} to ensure ${direction} rhythm. `,
        'Use noRhythm to suppress this warning.',
      ].join(''));
      return {
        outline: 'solid 1px red',
      };
    }
    return {
      ...padding,
      [paddingProp]: style[paddingProp] - borderWidth,
    };
  }, {});
};

const applyBorderWithRhythm = (style, theme, props) => {
  if (!props.border) return style;
  const borderProp = props.border === true
    ? 'border'
    : `border${props.border.charAt(0).toUpperCase()}${props.border.slice(1)}`;
  const borderWidth = props.borderWidth || theme.border.width;
  const borderColor = props.borderColor
    ? theme.colors[props.borderColor]
    : theme.colors.gray;
  const padding = adjustPaddingForRhythm(
    props.noRhythm,
    props.border,
    borderWidth,
    style,
  );
  return {
    ...style,
    ...padding,
    [borderProp]: `solid ${borderWidth}px ${borderColor}`,
  };
};

const Box: Styled<BoxProps> = styled((theme, props) => {
  const style = propsToStyle(theme, props);
  const styleWithBorder = applyBorderWithRhythm(style, theme, props);
  return styleWithBorder;
});

export default Box;
