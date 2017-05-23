// @flow
import Button, { type ButtonProps } from './button';
import Set from './set';
import SvgIcon from './svg-icon';
import Text from './text';
import withTheme, { type ThemeContext } from './withTheme';

export type CheckboxProps = ButtonProps & {
  label: string,
  labelOnLeft?: boolean,
  onChange: (value: boolean) => void,
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
      onPress={() => {
        if (restProps.onPress) restProps.onPress();
        onChange(!value);
      }}
      role="checkbox"
      size={size}
      {...{ marginVertical, paddingHorizontal, paddingVertical, ...restProps }}
    >
      <Set marginBottom={0}>
        {labelOnLeft && <Text color={color} size={size}>{label}</Text>}
        <SvgIcon
          color={color}
          size={size}
          svg={
            value ? theme.checkbox.checkedIcon : theme.checkbox.uncheckedIcon
          }
        />
        {!labelOnLeft && <Text color={color} size={size}>{label}</Text>}
      </Set>
    </Button>
  );
};

withTheme(Checkbox);

export default Checkbox;
