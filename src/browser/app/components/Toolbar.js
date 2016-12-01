/* @flow */
import style from './style';

const Toolbar = style((props, theme) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.scales.medium,
  paddingBottom: theme.scales.medium,
  paddingLeft: theme.scales.small,
  paddingRight: theme.scales.small,
  paddingTop: theme.scales.medium,
  '> *': {
    marginLeft: theme.scales.small,
    marginRight: theme.scales.small,
  },
}));

export default Toolbar;
