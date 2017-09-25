// @flow
import React from 'react';
import Button, { type ButtonProps } from './Button';
import Set from './Set';
import SvgIcon from './SvgIcon';
import Text from './Text';
import withTheme, { type WithTheme } from './withTheme';

export type CheckboxProps = {
  label?: string,
  labelOnLeft?: boolean,
  onChange?: (value: boolean) => any,
  value: boolean,
} & ButtonProps;

const Checkbox = ({
  theme,
  label,
  labelOnLeft = false,
  onChange,
  value,
  color,
  marginVertical = 0,
  onPress,
  paddingHorizontal = 0,
  paddingVertical = 0,
  size,
  ...props
}) => (
  <Button
    aria-checked={value}
    onPress={() => {
      if (onPress) onPress();
      if (!onChange) return;
      onChange(!value);
    }}
    role="checkbox"
    size={size}
    marginVertical={marginVertical}
    paddingHorizontal={paddingHorizontal}
    paddingVertical={paddingVertical}
    {...props}
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
        svg={value ? theme.checkbox.checkedIcon : theme.checkbox.uncheckedIcon}
      />
    </Set>
  </Button>
);

const CheckBoxWithTheme: WithTheme<CheckboxProps> = withTheme(Checkbox);

export default CheckBoxWithTheme;
