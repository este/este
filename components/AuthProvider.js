// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: Node,
  isAuthenticated: boolean,
  userId: ?string,
};

class AuthProvider extends React.Component<Props> {
  getChildContext() {
    return {
      isAuthenticated: this.props.isAuthenticated,
      userId: this.props.userId,
    };
  }
  render() {
    return this.props.children;
  }
}

AuthProvider.childContextTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

AuthProvider.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

export default AuthProvider;
