/* @flow */
import style from './style';

const Toolbar = style(theme => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.sizes.medium,
  paddingBottom: theme.sizes.medium,
  paddingLeft: theme.sizes.small,
  paddingRight: theme.sizes.small,
  paddingTop: theme.sizes.medium,
  '> *': {
    marginLeft: theme.sizes.small,
    marginRight: theme.sizes.small,
  },
}));

export default Toolbar;
