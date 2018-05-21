// @flow
import * as React from 'react';
import withTheme, { type Theme } from './withTheme';
import Text, { type TextProps } from './Text';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = {|
  ...TextProps,
  inline?: boolean,
  accessibilityLabel?: string,
  disabled?: boolean,
  onPress?: () => void,
  testID?: string,
|};

const getColorStyle = (styles, color) => {
  switch (color) {
    case 'primary':
      return styles.buttonPrimary;
    case 'success':
      return styles.buttonSuccess;
    case 'warning':
      return styles.buttonWarning;
    case 'danger':
      return styles.buttonDanger;
    case 'black':
      return styles.buttonBlack;
    case 'white':
      return styles.buttonWhite;
    case 'gray':
      return styles.buttonGray;
    default:
      (color: empty);
      return null;
  }
};

class Button extends React.PureComponent<{| ...ButtonProps, theme: Theme |}> {
  render() {
    const {
      inline,
      accessibilityLabel,
      disabled,
      onPress,
      testID,
      color,
      style,
      theme,
      ...props
    } = this.props;
    // Fix font smoothing only for buttons with background.
    const fixWebFontSmoothing = inline !== true && color != null;

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        testID={testID}
      >
        <Text
          fixWebFontSmoothing={fixWebFontSmoothing}
          {...(inline != null ? { color } : {})}
          style={[
            theme.styles.button,
            style,
            disabled === true && theme.styles.stateDisabled,
            inline == null && theme.styles.buttonSpaced,
            inline == null &&
              color != null &&
              getColorStyle(theme.styles, color),
          ]}
          {...props}
        />
      </TouchableOpacity>
    );
  }
}

export default withTheme(Button);
