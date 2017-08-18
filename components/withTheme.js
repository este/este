// @flow
import type { ComponentType } from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

// TODO: It should be higher order component. We are waiting for Flow update.
const withTheme = (Component: ComponentType<*>) => {
  // $FlowFixMe
  Component.contextTypes = {
    // $FlowFixMe
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
