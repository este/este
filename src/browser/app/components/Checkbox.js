// @flow
import type { BoxProps } from './Box';
import type { Color, Display, Strict } from '../themes/types';
import type { TextProps } from './Text';
import Button from './Button';
import React from 'react';
import Text from './Text';
import styled from './styled';

// Checkbox with SVG icon.
//  - flaticon.com
//  - thenounproject.com

export type CheckboxProps = {
  checkboxStyle?: Strict<BoxProps>,
  color?: Color,
  disabled?: boolean,
  display?: Display,
  field: Object, // TODO: Create type Field in fields.
  label?: string,
  labelPosition?: 'left' | 'right',
  labelStyle?: Strict<TextProps>,
  size?: number,
  svgIconChecked?: React$Element<any>,
  svgIconUnchecked?: React$Element<any>,
};

const SvgIcon = ({ color, size, svgIcon, ...props }) => {
  // Note how we can create styled componets on the fly when we need.
  const StyledSvgIcon = styled((theme, { size }) => ({
    $extends: [Text, ({
      ...props,
    }: Strict<TextProps>)],
    // Note String() to bypass type checking. We don't have typed for SVG yet.
    [String('fill')]: theme.colors[color],
    height: theme.typography.fontSize(size),
    width: theme.typography.fontSize(size),
  }), ({ className }) => React.cloneElement(svgIcon, { className }));
  return (
    <StyledSvgIcon size={size} />
  );
};

const defaultSvgIconChecked = (
  <svg viewBox="0 0 32 32">
    <path d="M2 15 L6 11 L14 19 L28 5 L32 9 L14 27 z" />
  </svg>
);

const defaultSvgIconUnchecked = (
  <svg viewBox="-16 -16 512 512">
    <path d="M405.333,106.667v298.666H106.667V106.667H405.333 M405.333,64H106.667C83.198,64,64,83.198,64,106.667v298.666    C64,428.802,83.198,448,106.667,448h298.666C428.802,448,448,428.802,448,405.333V106.667C448,83.198,428.802,64,405.333,64    L405.333,64z" />
  </svg>
);

const onClick = field => () => field.onChange({ value: !field.value });

const margin = {
  marginLeft: 0.4,
  marginRight: 1.6,
};

const Checkbox = ({
  checkboxStyle,
  color = 'black',
  disabled,
  display = 'flex',
  field,
  label,
  labelPosition = 'right',
  labelStyle,
  size = 0,
  svgIconChecked = defaultSvgIconChecked,
  svgIconUnchecked = defaultSvgIconUnchecked,
}: Strict<CheckboxProps>) => (
  <Button
    alignItems="center"
    disabled={disabled}
    display={display}
    inline
    noOutline // TODO: Fix accessibility somehow.
    onClick={onClick(field)}
    paddingHorizontal={0}
    {...checkboxStyle}
  >
    {label && labelPosition === 'left' &&
      <Text
        color={color}
        size={size}
        {...labelStyle}
      >{label}</Text>
    }
    <SvgIcon
      color={color}
      size={size}
      {...(label && labelPosition === 'left' ? margin : {})}
      svgIcon={field.value ? svgIconChecked : svgIconUnchecked}
    />
    {label && labelPosition === 'right' &&
      <Text
        color={color}
        size={size}
        {...margin}
        {...labelStyle}
      >{label}</Text>
    }
  </Button>
);

export default Checkbox;
