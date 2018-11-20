// @flow
import React from 'react';
import useTheme from '../../hooks/useTheme';
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

export default function Button(props: ButtonProps) {
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
    touchableStyle,
    activeOpacity,
    ...rest
  } = props;

  const theme = useTheme();

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
        {...rest}
      />
    </TouchableOpacity>
  );
}
