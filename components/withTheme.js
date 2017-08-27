// @flow
import type { ComponentType } from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

const withTheme = (Component: ComponentType<any>) => {
  // $FlowFixMe
  Component.contextTypes = {
    // $FlowFixMe
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
