// @flow
import type { ComponentType } from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

export type ThemeContext = { theme: Theme };

const withTheme = (Component: ComponentType<any>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    theme: PropTypes.object,
  };
};

export default withTheme;
