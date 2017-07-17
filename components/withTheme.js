// @flow
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

// withTheme can't be higher order component because Flow can't type HOCs yet.
// TODO: Switch to ReasonML ASAP.
const withTheme = (Component: ReactClass<*>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
