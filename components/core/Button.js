// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import Theme from './Theme';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = TextProps & {
  inline?: boolean,
  accessibilityLabel?: string,
  disabled?: boolean,
  onPress: () => void,
  testID?: string,
};

class Button extends React.PureComponent<ButtonProps> {
  static getColorStyle = (styles: *, color: *) => {
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

  render() {
    const {
      inline,
      accessibilityLabel,
      disabled,
      onPress,
      testID,
      color,
      style,
      ...props
    } = this.props;
    // Fix font smoothing only for buttons with background.
    const fixWebFontSmoothing = inline !== true && color != null;

    return (
      <Theme>
        {theme => (
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
                  Button.getColorStyle(theme.styles, color),
              ]}
              {...props}
            />
          </TouchableOpacity>
        )}
      </Theme>
    );
  }
}

export default Button;
