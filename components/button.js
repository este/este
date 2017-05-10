// @flow
import Text, { type TextProps } from './text';
import type { ColorProps } from '../themes/types';
import withTheme, { type ThemeContext } from './withTheme';

// Use a div instead of a button because a div has no default weird styles.
// https://www.w3.org/TR/wai-aria-practices-1.1/#button
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus
const BrowserDivButton = ({
  disabled,
  onPress,
  ...restProps
}: {
  disabled?: boolean,
  onPress?: EventHandler,
}) => (
  <div // eslint-disable-line jsx-a11y/no-static-element-interactions
    role="button"
    disabled={disabled}
    onClick={onPress}
    onKeyPress={(e: Event) => {
      if (disabled) return;
      const activation = e.key === 'Enter' || e.key === ' ';
      if (!activation || !onPress) return;
      e.preventDefault();
      onPress(e);
    }}
    tabIndex={disabled ? -1 : 0}
    {...restProps}
  />
);

type UniversalButtonElement = {
  blur: () => void,
  focus: () => void,
};

export type ButtonProps = ColorProps &
  TextProps & {
    disabled?: boolean,
    onPress?: (
      event: Event & { currentTarget: UniversalButtonElement }
    ) => mixed,
    outline?: boolean,
  };

const Button = (props: ButtonProps, { theme }: ThemeContext) => {
  const {
    as = BrowserDivButton,
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

  const style = {
    ...(restProps.isReactNative
      ? null
      : {
          cursor: 'pointer',
          outline: 'none',
          pointerEvents: restProps.disabled ? 'none' : 'auto',
          userSelect: 'none',
        }),
    ...restProps.style,
  };

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
        style,
      }}
    />
  );
};

withTheme(Button);

export default Button;
