// @flow
import Button, { type ButtonProps } from './button';
import SvgIcon from './svg-icon';
import Text from './text';
import withTheme, { type ThemeContext } from './withTheme';

export type RadioProps = ButtonProps & {
  label: string,
  labelOnLeft?: boolean,
  onChange?: ({ value: string }) => mixed,
  select: string,
  value: string,
};

const Radio = (
  {
    label,
    labelOnLeft = false,
    onChange,
    select,
    value,
    color,
    size,
    ...props
  }: RadioProps,
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
      aria-checked={value === select}
      onPress={() => onChange && onChange({ value: select })}
      role="radio"
      size={size}
      {...{ marginVertical, paddingHorizontal, paddingVertical, ...restProps }}
    >
      {labelOnLeft && <Text color={color} size={size}>{label}</Text>}
      <SvgIcon
        color={color}
        size={size}
        svg={value ? theme.radio.checkedIcon : theme.radio.uncheckedIcon}
        {...{ [labelOnLeft ? 'marginLeft' : 'marginRight']: 0.5 }}
      />
      {!labelOnLeft && <Text color={color} size={size}>{label}</Text>}
    </Button>
  );
};

withTheme(Radio);

export default Radio;
