// @flow
import Text, { type TextProps } from './text';
import type { ColorProps } from '../themes/types';
import withTheme, { type ThemeContext } from './withTheme';

const BrowserButton = ({ onPress, ...restProps }) => (
  <button onClick={() => onPress()} {...restProps} />
);

export type ButtonProps = ColorProps &
  TextProps & {
    disabled?: boolean,
    onPress: () => void,
    outline?: boolean,
  };

const Button = (props: ButtonProps, { theme }: ThemeContext) => {
  const {
    as = BrowserButton,
    size = 0,
    borderRadius = theme.button.borderRadius,
    marginHorizontal = theme.button.marginHorizontal,
    marginVertical = size < 0
      ? theme.button.marginVertical + theme.button.paddingVertical
      : theme.button.marginVertical,
    paddingHorizontal = 1,
    // For size < 0, there is no space for a padding.
    paddingVertical = size < 0 ? 0 : theme.button.paddingVertical,
    outline,
    ...restProps
  } = props;

  // <Button primary etc. shorthand. It overrides defaults.
  const colorName = Object.keys(theme.colors).find(color => props[color]);
  if (colorName) {
    delete restProps[colorName];
    if (outline) {
      restProps.borderColor = colorName;
      restProps.borderStyle = 'solid';
      restProps.borderWidth = theme.button.borderWidth;
      restProps.color = colorName;
    } else {
      restProps.backgroundColor = colorName;
      restProps.bold = true;
      restProps.color = 'white';
    }
  }

  // Ensure vertical rhythm for small button with border. The lineHeight
  // is the only possible way how to do it. It doesn't work for multilines.
  if (size < 0 && restProps.borderWidth) {
    restProps.lineHeight =
      theme.typography.lineHeight - 2 * restProps.borderWidth;
  }

  if (restProps.disabled) {
    restProps.opacity = theme.button.disabledOpacity;
  }

  return (
    <Text
      {...{
        as,
        size,
        borderRadius,
        marginHorizontal,
        marginVertical,
        paddingHorizontal,
        paddingVertical,
        ...restProps,
      }}
    />
  );
};

withTheme(Button);

export default Button;
