// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

export type AuthContext = {
  isAuthenticated: boolean,
  userId: ?string,
};

const withAuth = (Component: React.ComponentType<any>) => {
  Component.contextTypes = {
    ...Component.contextTypes,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string,
  };
};

export default withAuth;

// // TODO: Use it.
// export type AuthProps = {
//   isAuthenticated: boolean,
//   userId: ?string,
// };
//
// export const withAuth2 = <Props: {}>(
//   Component: React.ComponentType<AuthProps & Props>,
// ): React.ComponentType<Props> => {
//   const WithAuth = (props: Props, { isAuthenticated, userId }: AuthProps) => (
//     <Component {...props} isAuthenticated={isAuthenticated} userId={userId} />
//   );
//   WithAuth.contextTypes = {
//     isAuthenticated: PropTypes.bool,
//     userId: PropTypes.string,
//   };
//   return WithAuth;
// };
