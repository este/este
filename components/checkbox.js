// @flow
import Button, { type ButtonProps } from './button';
import SvgIcon from './svg-icon';
import Text from './text';
import withTheme, { type ThemeContext } from './withTheme';

export type CheckboxProps = ButtonProps & {
  label: string,
  labelOnLeft?: boolean,
  // onChange?: ({ value: boolean }) => mixed,
  value: boolean,
};

const Checkbox = (
  {
    label,
    labelOnLeft = false,
    // onChange,
    value,
    color,
    size,
    ...props
  }: CheckboxProps,
  { theme }: ThemeContext
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
      // onPress={() => onChange && onChange({ value: !value })}
      role="checkbox"
      size={size}
      {...{ marginVertical, paddingHorizontal, paddingVertical, ...restProps }}
    >
      {labelOnLeft && <Text color={color} size={size}>{label}</Text>}
      <SvgIcon
        color={color}
        size={size}
        svg={value ? theme.checkbox.checkedIcon : theme.checkbox.uncheckedIcon}
        {...{ [labelOnLeft ? 'marginLeft' : 'marginRight']: 0.5 }}
      />
      {!labelOnLeft && <Text color={color} size={size}>{label}</Text>}
    </Button>
  );
};

withTheme(Checkbox);

export default Checkbox;
