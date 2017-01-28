// @flow
import type { Color } from '../../common/themes/types';
import React from 'react';
import { Button, Text } from '../../common/components';

// Checkbox with SVG icon.
//  - flaticon.com
//  - thenounproject.com
// TODO: Make it universal. Add focus style.
export type CheckboxProps = {
  color?: Color,
  disabled?: boolean,
  inline?: boolean,
  label?: string,
  labelPosition?: 'left' | 'right',
  onChange?: ({ value: any }) => void,
  size?: number,
  svgIconChecked?: React.Element<*>,
  svgIconUnchecked?: React.Element<*>,
  value?: any,
};

const DefaultSvgIconChecked = (
  <svg viewBox="0 0 32 32">
    <path d="M2 15 L6 11 L14 19 L28 5 L32 9 L14 27 z" />
  </svg>
);

const DefaultSvgIconUnchecked = (
  <svg viewBox="-16 -16 512 512">
    <path
      d="M405.333,106.667v298.666H106.667V106.667H405.333 M405.333,64H106.667C83.198,64,64,83.198,64,106.667v298.666    C64,428.802,83.198,448,106.667,448h298.666C428.802,448,448,428.802,448,405.333V106.667C448,83.198,428.802,64,405.333,64 L405.333,64z"
    />
  </svg>
);

const SvgIcon = ({ color, size, svgIcon, ...props }) => (
  <Text
    as={svgProps => React.cloneElement(svgIcon, svgProps)}
    style={theme => ({
      fill: theme.colors[color],
      height: theme.typography.fontSize(size),
      width: theme.typography.fontSize(size),
    })}
    {...props}
  />
);

const marginVertical = labelPosition => ({
  [labelPosition === 'right' ? 'marginRight' : 'marginLeft']: 0.5,
});

const Checkbox = (
  {
    color = 'black',
    disabled,
    inline,
    label,
    labelPosition = 'right',
    onChange,
    size = 0,
    svgIconChecked = DefaultSvgIconChecked,
    svgIconUnchecked = DefaultSvgIconUnchecked,
    value,
  }: CheckboxProps,
) => (
  <Button
    alignItems="center"
    boxStyle={() => ({ outline: 'none' })}
    disabled={disabled}
    flexDirection={labelPosition === 'right' ? 'row' : 'row-reverse'}
    justifyContent={labelPosition === 'right' ? 'flex-start' : 'flex-end'}
    marginVertical={0}
    onPress={() => onChange && onChange({ value: !value })}
    paddingVertical={0}
  >
    <SvgIcon
      color={color}
      size={size}
      svgIcon={value ? svgIconChecked : svgIconUnchecked}
      {...marginVertical(labelPosition)}
    />
    {label &&
      <Text
        color={color}
        size={size}
        {...(inline ? marginVertical(labelPosition) : null)}
      >{label}</Text>
    }
  </Button>
);

export default Checkbox;
