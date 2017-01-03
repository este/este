// @flow
import type { Color } from '../themes/types';
import Button from './Button';
import React from 'react';
import Text from './Text';
import styled from './styled';

// Checkbox with SVG icon.
//  - flaticon.com
//  - thenounproject.com

type CheckboxProps = {|
  color?: Color,
  disabled?: boolean,
  field: Object, // TODO: Create type Field in fields.
  label?: string,
  size?: number,
  svgIconChecked?: React$Element<any>,
  svgIconUnchecked?: React$Element<any>,
|};

const SvgIcon = ({ color, size, svgIcon }) => {
  // Note how we can create styled componets on the fly when we need that.
  const StyledSvgIcon = styled((theme, { size }) => ({
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
  <svg viewBox="0 0 512 512">
    <path d="M405.333,106.667v298.666H106.667V106.667H405.333 M405.333,64H106.667C83.198,64,64,83.198,64,106.667v298.666    C64,428.802,83.198,448,106.667,448h298.666C428.802,448,448,428.802,448,405.333V106.667C448,83.198,428.802,64,405.333,64    L405.333,64z" />
  </svg>
);

const onClick = field => () => field.onChange({ value: !field.value });

const Checkbox = ({
  color = 'black',
  disabled,
  field,
  label,
  size = 0,
  svgIconChecked = defaultSvgIconChecked,
  svgIconUnchecked = defaultSvgIconUnchecked,
}: CheckboxProps) => (
  <Button
    alignItems="center"
    disabled={disabled}
    display="flex"
    inline
    onClick={onClick(field)}
    paddingHorizontal={0}
    noOutline // TODO: Fix accessibility somehow.
  >
    <SvgIcon
      color={color}
      size={size}
      svgIcon={field.value ? svgIconChecked : svgIconUnchecked}
    />
    <Text
      color={color}
      marginLeft={0.5}
      size={size}
    >{label}</Text>
  </Button>
);

export default Checkbox;
