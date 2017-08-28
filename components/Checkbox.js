// @flow
import React from 'react';
import Button, { type ButtonProps } from './Button';
import Set from './Set';
import SvgIcon from './SvgIcon';
import Text from './Text';
import withTheme, { type ThemeContext } from './withTheme';

export type CheckboxProps = ButtonProps & {
  label?: string,
  labelOnLeft?: boolean,
  onChange?: (value: boolean) => any,
  value: boolean,
};

const Checkbox = (
  {
    label,
    labelOnLeft = false,
    onChange,
    value,
    color,
    size,
    ...props
  }: CheckboxProps,
  { theme }: ThemeContext,
) => {
  const {
    marginVertical = 0,
    paddingHorizontal = 0,
    paddingVertical = 0,
    ...restProps
  } = props;
  return (
    <Button
      aria-checked={value}
      onPress={() => {
        if (restProps.onPress) restProps.onPress();
        if (!onChange) return;
        onChange(!value);
      }}
      role="checkbox"
      size={size}
      {...{ marginVertical, paddingHorizontal, paddingVertical, ...restProps }}
    >
      <Set
        marginBottom={0}
        flexDirection={labelOnLeft ? 'row' : 'row-reverse'}
        justifyContent={labelOnLeft ? 'flex-start' : 'flex-end'}
      >
        {label && (
          <Text color={color} size={size}>
            {label}
          </Text>
        )}
        <SvgIcon
          color={color}
          size={size}
          svg={
            value ? theme.checkbox.checkedIcon : theme.checkbox.uncheckedIcon
          }
        />
      </Set>
    </Button>
  );
};

withTheme(Checkbox);

export default Checkbox;
