/* @flow */
import initial, { compute as computeInitial } from './initial';

const theme = computeInitial({
  ...initial,
  colors: {
    ...initial.colors,
    primary: '#6496c8',
    black: '#555',
  },
  fontSizes: [46, 30, 22, 18, 14, 12, 10],
  lineHeight: 2,
});

const compute = (theme: Object) => ({
  ...theme,
  link: {
    ...theme.link,
    color: '#346392',
  },
  Toolbar: {
    ...theme.Toolbar,
    paddingBottom: initial.scale[1],
    paddingTop: initial.scale[1],
  },
});

export default compute(theme);
