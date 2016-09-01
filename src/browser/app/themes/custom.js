/* @flow */
import initial, { setComponents } from './initial';

// This is just a custom theme example.

const theme = {
  ...initial,
  colors: {
    ...initial.colors,
    black: '#555',
  },
  fontSizes: [46, 30, 22, 18, 14, 12, 10],
  lineHeight: 2,
};

export default setComponents(theme);
