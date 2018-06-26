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
  onPress?: () => void,
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
      testID,
      style,
      theme,
      touchableStyle,
      onFocus,
      onBlur,
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
        testID={testID}
        style={touchableStyle}
        onFocus={onFocus}
        onBlur={onBlur}
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
