// @flow
import Button, { type ButtonProps } from './button';
import Set from './set';
import SvgIcon from './svg-icon';
import Text from './text';
import withTheme, { type ThemeContext } from './withTheme';

export type RadioProps = ButtonProps & {
  label?: string,
  labelOnLeft?: boolean,
  onChange: (value: string) => void,
  select: string,
  value: ?string,
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
  const checked = value === select;
  return (
    <Button
      aria-checked={checked}
      onPress={() => {
        if (restProps.onPress) restProps.onPress();
        onChange(select);
      }}
      role="radio"
      size={size}
      {...{ marginVertical, paddingHorizontal, paddingVertical, ...restProps }}
    >
      <Set marginBottom={0} flexDirection={labelOnLeft ? 'row' : 'row-reverse'}>
        {label && <Text color={color} size={size}>{label}</Text>}
        <SvgIcon
          color={color}
          size={size}
          svg={checked ? theme.radio.checkedIcon : theme.radio.uncheckedIcon}
        />
      </Set>
    </Button>
  );
};

withTheme(Radio);

export default Radio;
