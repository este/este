// @flow
import type { Theme } from '../themes/types';
import * as React from 'react';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

// TODO: It should be higher order component. We are waiting for Flow update.
const withTheme = (Component: React.ComponentType<*>) => {
  // $FlowFixMe
  Component.contextTypes = {
    // $FlowFixMe
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
