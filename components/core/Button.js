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
                theme.styles.button.text,
                style,
                disabled === true && theme.styles.states.disabled,
                inline == null && theme.styles.button.spaced,
                inline == null && color != null && theme.styles.button[color],
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
