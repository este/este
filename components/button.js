// @flow
import type { ColorProps } from '../themes/types';
import Text, { type TextProps } from './text';
import injectTheme, { type ThemeProp } from './inject-theme';

// Browser button is rendered as div with button role because button element is
// hard to style consistently in Firefox and maybe elsewhere. Div is just fine.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
const BrowserButton = ({
  disabled,
  onPress,
  style,
  ...restProps
}: {
  disabled?: boolean,
  onPress: () => void,
  style?: Object,
}) =>
  <div // eslint-disable-line jsx-a11y/no-static-element-interactions
    onClick={onPress}
    onKeyPress={(e: KeyboardEvent) => {
      if (disabled) return;
      // Buttons are expected to be triggered using the Space or Enter key.
      const isTriggered = e.key === ' ' || e.key === 'Enter';
      if (!isTriggered) return;
      // Prevent scroll on spacebar press.
      e.preventDefault();
      onPress();
    }}
    role="button"
    tabIndex={disabled ? -1 : 0}
    style={{
      ...(style || {}),
      cursor: disabled ? 'default' : 'pointer',
      pointerEvents: disabled ? 'none' : 'auto',
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    }}
    {...restProps}
  />;

export type ButtonProps = ColorProps &
  TextProps & {
    disabled?: boolean,
    onPress?: () => any,
    outline?: boolean,
  };

const Button = (props: ButtonProps & ThemeProp) => {
  const {
    as = BrowserButton,
    theme,
    size = 0,
    borderRadius = theme.button.borderRadius,
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
        marginVertical,
        paddingHorizontal,
        paddingVertical,
        ...restProps,
      }}
    />
  );
};

export default injectTheme(Button);
