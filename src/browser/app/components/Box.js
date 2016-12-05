/* @flow */
import type {
  Color,
  Exact,
  Size,
  Style as StyleType,
  TextAlign,
  TopBottomLeftRight,
} from '../themes/types';
import React from 'react';
import style from './style';
import warning from 'warning';

type MarginSize = Size | 'auto';

type BoxProps = {
  margin?: MarginSize,
  marginBottom?: MarginSize,
  marginHorizontal?: MarginSize,
  marginLeft?: MarginSize,
  marginRight?: MarginSize,
  marginTop?: MarginSize,
  marginVertical?: MarginSize,
  padding?: Size,
  paddingBottom?: Size,
  paddingHorizontal?: Size,
  paddingLeft?: Size,
  paddingRight?: Size,
  paddingTop?: Size,
  paddingVertical?: Size,
  textAlign?: TextAlign,
  width?: number | string,
  height?: number | string,
  maxWidth?: number | string,
  maxHeight?: number | string,
  minWidth?: number | string,
  minHeight?: number | string,
  style?: StyleType,
  backgroundColor?: Color,
  border?: true | TopBottomLeftRight,
  borderColor?: Color,
  borderWidth?: string,
};

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const mapPropToStyle = (prop, value: any, theme, props) => {
  switch (prop) {
    case 'margin':
    case 'marginBottom':
    case 'marginLeft':
    case 'marginRight':
    case 'marginTop':
    case 'padding':
    case 'paddingBottom':
    case 'paddingLeft':
    case 'paddingRight':
    case 'paddingTop':
      return { [prop]: theme.sizes[value] || 'auto' };
    case 'marginHorizontal':
    case 'marginVertical':
    case 'paddingHorizontal':
    case 'paddingVertical': {
      const size = theme.sizes[value] || 'auto';
      const [d1, d2] = directionMapping[prop];
      return { [d1]: size, [d2]: size };
    }
    case 'textAlign':
      return { textAlign: value };
    case 'width':
    case 'height':
    case 'maxWidth':
    case 'maxHeight':
    case 'minWidth':
    case 'minHeight':
      return { [prop]: value };
    case 'backgroundColor':
      return { backgroundColor: theme.colors[value] };
    case 'border':
    case 'borderColor':
    case 'borderWidth': {
      if (prop !== 'border') return null;
      const borderProp = value === true
        ? 'border'
        : `border${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      const width = props.borderWidth || theme.border.width;
      const color = props.borderColor
        ? theme.colors[props.borderColor]
        : theme.colors.gray;
      return {
        [borderProp]: `solid ${width}px ${color}`,
        borderRadius: theme.border.radius,
      };
    }
    default:
      return undefined;
  }
};

const Box = style((theme, props: BoxProps) => Object
  .keys(props)
  .reduce((style, prop) => {
    if (prop === 'theme') return style;
    const value = props[prop];
    if (value == null) {
      warning(false, 'Prop %s in Box has null or undefined value.', prop);
      return style;
    }
    const propStyle = mapPropToStyle(prop, value, theme, props);
    if (propStyle === null) return style;
    if (propStyle === undefined) {
      warning(false, 'Unknown prop %s in Box.', prop);
      return style;
    }
    return { ...style, ...propStyle };
  }, {}),
);

export default (props: Exact<BoxProps>) => <Box {...props} />;
