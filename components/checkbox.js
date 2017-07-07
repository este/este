// @flow
import Button, { type ButtonProps } from './button';
import Set from './set';
import SvgIcon from './svg-icon';
import Text from './text';
import injectTheme, { type ThemeProps } from './inject-theme';

export type CheckboxProps = ButtonProps & {
  label?: string,
  labelOnLeft?: boolean,
  onChange?: (value: boolean) => any,
  value: boolean,
};

const Checkbox = ({
  theme,
  label,
  labelOnLeft = false,
  onChange,
  value,
  color,
  size,
  ...props
}: CheckboxProps & ThemeProps) => {
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
        {label &&
          <Text color={color} size={size}>
            {label}
          </Text>}
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

export default injectTheme(Checkbox);
