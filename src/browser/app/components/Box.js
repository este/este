// @flow
import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  BorderStyle,
  Color,
  Display,
  FlexDirection,
  FlexFlow,
  FlexWrap,
  JustifyContent,
  Styled,
  TopBottomLeftRight,
  VerticalAlign,
} from '../themes/types';
import styled from './styled';
import warning from 'warning';

export type BoxProps = {
  // Element
  className?: string,
  id?: string,
  style?: *,
  // CSS
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  backgroundColor?: Color,
  border?: boolean | TopBottomLeftRight,
  borderColor?: Color,
  borderRadius?: number,
  borderStyle?: BorderStyle,
  borderWidth?: number,
  display?: Display,
  flex?: number,
  flexBasis?: number | string,
  flexDirection?: FlexDirection,
  flexFlow?: FlexFlow,
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: FlexWrap,
  height?: number,
  justifyContent?: JustifyContent,
  margin?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  marginTop?: number,
  maxHeight?: number,
  maxWidth?: number,
  minHeight?: number,
  minWidth?: number,
  order?: number,
  padding?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  verticalAlign?: VerticalAlign,
  width?: number,
  // Custom
  marginHorizontal?: number,
  marginVertical?: number,
  paddingHorizontal?: number,
  paddingVertical?: number,
  suppressRhythmWarning?: boolean,
};

const rhythm = (theme, value) => theme.typography.lineHeight * value;

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const propToStyle = (prop, value: any, theme) => {
  switch (prop) {
    // Plain props.
    case 'alignContent':
    case 'alignItems':
    case 'alignSelf':
    case 'display':
    case 'flex':
    case 'flexBasis':
    case 'flexDirection':
    case 'flexFlow':
    case 'flexGrow':
    case 'flexShrink':
    case 'flexWrap':
    case 'justifyContent':
    case 'order':
    case 'verticalAlign':
      return { [prop]: value };
    // Simple rhythm props.
    case 'marginBottom':
    case 'marginLeft':
    case 'marginRight':
    case 'marginTop':
    case 'paddingBottom':
    case 'paddingLeft':
    case 'paddingRight':
    case 'paddingTop':
    case 'width':
    case 'height':
    case 'maxWidth':
    case 'maxHeight':
    case 'minWidth':
    case 'minHeight':
      return {
        // We allow only number otherwise it would be easy to break rhythm.
        [prop]: rhythm(theme, value),
      };
    // Shorthand rhythm props.
    case 'marginHorizontal':
    case 'marginVertical':
    case 'paddingHorizontal':
    case 'paddingVertical': {
      const [d1, d2] = directionMapping[prop];
      return {
        [d1]: rhythm(theme, value),
        [d2]: rhythm(theme, value),
      };
    }
    // Split margin shorthand to be computable.
    case 'margin': {
      return {
        marginBottom: rhythm(theme, value),
        marginLeft: rhythm(theme, value),
        marginRight: rhythm(theme, value),
        marginTop: rhythm(theme, value),
      };
    }
    // Split padding shorthand to be computable.
    case 'padding': {
      return {
        paddingBottom: rhythm(theme, value),
        paddingLeft: rhythm(theme, value),
        paddingRight: rhythm(theme, value),
        paddingTop: rhythm(theme, value),
      };
    }
    // Other props.
    case 'backgroundColor':
      return { backgroundColor: theme.colors[value] };
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

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const adjustPaddingForRhythm = (
  suppressRhythmWarning,
  border,
  borderWidth,
  style,
) => {
  if (!borderWidth) return {};
  return ['Bottom', 'Left', 'Right', 'Top'].reduce((padding, prop) => {
    const adjust = border === true || border === prop.toLowerCase();
    if (!adjust) return padding;
    const paddingProp = `padding${prop}`;
    const paddingValue = style[paddingProp];
    if (typeof paddingValue === 'string') {
      // If paddingValue is string, we can't compensate it.
      return { ...padding, [paddingProp]: paddingValue };
    }
    const canCompensate = paddingValue && (paddingValue - borderWidth) >= 0;
    if (!canCompensate) {
      if (suppressRhythmWarning) return {};
      const direction = prop === 'Left' || prop === 'Right'
        ? 'horizontal'
        : 'vertical';
      warning(false, [
        `Increase ${paddingProp} to ensure ${direction} rhythm. `,
        'Use suppressRhythmWarning prop to suppress this warning.',
      ].join(''));
    }
    return {
      ...canCompensate ? {} : { outline: 'solid 1px red' },
      ...padding,
      [paddingProp]: paddingValue - borderWidth,
    };
  }, {});
};

const borderWithRhythm = (theme, style, {
  border,
  borderColor = 'gray',
  borderRadius = theme.border.radius,
  borderStyle = 'solid',
  borderWidth = theme.border.width,
  suppressRhythmWarning,
}) => {
  if (!border) return style;
  const padding = adjustPaddingForRhythm(
    suppressRhythmWarning,
    border,
    borderWidth,
    style,
  );
  const prop = border === true ? '' : border.charAt(0).toUpperCase() + border.slice(1);
  return {
    [`border${prop}Color`]: theme.colors[borderColor],
    [`border${prop}Style`]: borderStyle,
    [`border${prop}Width`]: borderWidth,
    ...padding,
    ...(border === true ? { borderRadius } : null),
  };
};

const Box: Styled<BoxProps> = styled((theme, props) => {
  const style = propsToStyle(theme, props);
  return {
    ...style,
    ...borderWithRhythm(theme, style, props),
  };
});

export default Box;
