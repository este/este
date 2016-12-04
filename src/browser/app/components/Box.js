/* @flow */
import type { Exact, Size, TextAlign } from '../themes/types';
import React from 'react';
import style from './style';
import warning from 'warning';

export type BoxProps = {
  margin?: Size,
  marginBottom?: Size,
  marginHorizontal?: Size,
  marginLeft?: Size,
  marginRight?: Size,
  marginTop?: Size,
  marginVertical?: Size,
  padding?: Size,
  paddingBottom?: Size,
  paddingHorizontal?: Size,
  paddingLeft?: Size,
  paddingRight?: Size,
  paddingTop?: Size,
  paddingVertical?: Size,
  textAlign?: TextAlign,
};

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const mapPropToStyle = (prop, value: any, theme) => {
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
      return { [prop]: theme.sizes[value] };
    case 'marginHorizontal':
    case 'marginVertical':
    case 'paddingHorizontal':
    case 'paddingVertical': {
      const size = theme.sizes[value];
      const [x1, x2] = directionMapping[prop];
      return { [x1]: size, [x2]: size };
    }
    case 'textAlign':
      return { textAlign: value };
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
    const propStyle = mapPropToStyle(prop, value, theme);
    if (propStyle === undefined) {
      warning(false, 'Unknown prop %s in Box.', prop);
      return style;
    }
    return { ...style, ...propStyle };
  }, {}),
);

export default (props: Exact<BoxProps>) => <Box {...props} />;
