// @flow
import type { ComponentType } from 'react';
import PropTypes from 'prop-types';

export type AuthContext = {
  isAuthenticated: boolean,
  userId: ?string,
};

// TODO: Make higher order component, check new $Compose type.
const withAuth = (Component: ComponentType<any>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string,
  };
};

export default withAuth;
