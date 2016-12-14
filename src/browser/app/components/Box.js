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
  MarginSize,
  Size,
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
  borderRadius?: number, // TODO: Consider Size as well.
  borderWidth?: number, // TODO: Consider Size as well.
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
  margin?: MarginSize,
  marginBottom?: MarginSize,
  marginHorizontal?: MarginSize,
  marginLeft?: MarginSize,
  marginRight?: MarginSize,
  marginTop?: MarginSize,
  marginVertical?: MarginSize,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  order?: number,
  padding?: Size,
  paddingBottom?: Size,
  paddingHorizontal?: Size,
  paddingLeft?: Size,
  paddingRight?: Size,
  paddingTop?: Size,
  paddingVertical?: Size,
  style?: any,
  width?: number | string,
  noRhythm?: boolean,
};

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const propToStyle = (prop, value: any, theme) => {
  // Note pattern, use theme.sized for vertical rhythm, and theme.fontSize for
  // horizontal rhythm.
  switch (prop) {
    // Vertical props.
    case 'marginBottom':
    case 'marginTop':
    case 'paddingBottom':
    case 'paddingTop':
      return {
        [prop]: theme.sizes[value],
      };
    // Horizontal props.
    case 'marginLeft':
    case 'marginRight':
    case 'paddingLeft':
    case 'paddingRight':
      return {
        [prop]: theme.fontSizes[value],
      };
    // Vertical shorthand props.
    case 'marginVertical':
    case 'paddingVertical': {
      const size = theme.sizes[value];
      const [d1, d2] = directionMapping[prop];
      return { [d1]: size, [d2]: size };
    }
    // Horizontal shorthand props.
    case 'marginHorizontal':
    case 'paddingHorizontal': {
      const size = theme.fontSizes[value];
      const [d1, d2] = directionMapping[prop];
      return { [d1]: size, [d2]: size };
    }
    // Split shorthand to be easily computable.
    case 'margin': {
      return {
        marginLeft: theme.fontSizes[value],
        marginRight: theme.fontSizes[value],
        marginTop: theme.sizes[value],
        marginBottom: theme.sizes[value],
      };
    }
    // Split shorthand to be easily computable.
    case 'padding': {
      return {
        paddingLeft: theme.fontSizes[value],
        paddingRight: theme.fontSizes[value],
        paddingTop: theme.sizes[value],
        paddingBottom: theme.sizes[value],
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
