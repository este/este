// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';

export type AuthContext = {
  isAuthenticated: boolean,
  userId: ?string,
};

const withAuth = (Component: ComponentType<any>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string,
  };
};

export default withAuth;
