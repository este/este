// @flow
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

// TODO: It should be higher order component. We are waiting for Flow update.
const withTheme = (Component: ReactClass<*>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
