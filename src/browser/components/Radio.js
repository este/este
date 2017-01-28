// @flow
import type { CheckboxProps } from './Checkbox';
import Checkbox from './Checkbox';
import React from 'react';

export type RadioProps = CheckboxProps & {
  selected: any,
};

const defaultSvgIconChecked = (
  <svg viewBox="7 9 70 70">
    <path
      d="M45,24c11.579,0,21,9.42,21,21c0,11.579-9.421,21-21,21c-11.58,0-21-9.421-21-21C24,33.42,33.42,24,45,24 M45,20c-13.807,0-25,11.193-25,25c0,13.807,11.193,25,25,25c13.807,0,25-11.193,25-25C70,31.193,58.807,20,45,20L45,20z"
      fill="#000"
    />
    <circle
      cx="45"
      cy="45"
      r="16.77"
    />
  </svg>
);

const defaultSvgIconUnchecked = (
  <svg viewBox="7 9 70 70">
    <path
      d="M45,24c11.579,0,21,9.42,21,21c0,11.579-9.421,21-21,21c-11.58,0-21-9.421-21-21C24,33.42,33.42,24,45,24 M45,20c-13.807,0-25,11.193-25,25s11.193,25,25,25s25-11.193,25-25S58.807,20,45,20L45,20z"
    />
  </svg>
);

const Radio = ({
  onChange,
  selected,
  svgIconChecked = defaultSvgIconChecked,
  svgIconUnchecked = defaultSvgIconUnchecked,
  value,
  ...props
}: RadioProps) => (
  <Checkbox
    inline={true} // eslint-disable-line react/jsx-boolean-value
    onChange={() => onChange && onChange({ value: selected })}
    svgIconChecked={svgIconChecked}
    svgIconUnchecked={svgIconUnchecked}
    value={value === selected}
    {...props}
  />
);

export default Radio;
