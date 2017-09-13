// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';

export type IsAuthenticatedContext = { isAuthenticated: boolean };

const withIsAuthenticated = (Component: ComponentType<any>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    isAuthenticated: PropTypes.bool,
  };
};

export default withIsAuthenticated;
