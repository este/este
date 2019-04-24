import { StyleSheet } from 'react-native';
import { colors, LightTheme, dimensions } from './lightTheme';

const darkColors = {
  ...colors,
  background: '#343a40',
  foreground: '#ffffff',
};

export const darkTheme = StyleSheet.create(
  new LightTheme(darkColors, dimensions),
);
