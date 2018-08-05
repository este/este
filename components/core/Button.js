// @flow
import * as React from 'react';
import withTheme, { type Theme } from './withTheme';
import Text, { type TextProps } from './Text';
import { TouchableOpacity } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

// TODO: React Native soon will have typed props.
export type ButtonProps = {|
  ...TextProps,
  accessible?: boolean,
  accessibilityLabel?: string,
  disabled?: boolean,
  onPress?: Event => void,
  onPressIn?: Event => void,
  onFocus?: () => void,
  onBlur?: () => void,
  testID?: string,
  touchableStyle?: ViewStyleProp,
  activeOpacity?: number,
|};

class Button extends React.PureComponent<{| ...ButtonProps, theme: Theme |}> {
  render() {
    const {
      accessible,
      accessibilityLabel,
      disabled,
      onPress,
      onPressIn,
      onFocus,
      onBlur,
      testID,
      style,
      theme,
      touchableStyle,
      activeOpacity,
      ...props
    } = this.props;

    return (
      <TouchableOpacity
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onFocus={onFocus}
        onBlur={onBlur}
        testID={testID}
        style={touchableStyle}
        activeOpacity={activeOpacity}
      >
        <Text
          style={[style, disabled === true && theme.styles.stateDisabled]}
          {...props}
        />
      </TouchableOpacity>
    );
  }
}

export default withTheme(Button);
