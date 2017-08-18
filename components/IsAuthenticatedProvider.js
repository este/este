// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

// isAuthenticated is a cross-cutting concern. It's the same for the whole app
// so it doesn't make sense to pass it via props, which are component specific.

type IsAuthenticatedProviderProps = {
  children: Node,
  isAuthenticated: boolean,
};

class IsAuthenticatedProvider extends React.Component<
  IsAuthenticatedProviderProps,
> {
  getChildContext() {
    return { isAuthenticated: this.props.isAuthenticated };
  }
  render() {
    return this.props.children;
  }
}

IsAuthenticatedProvider.childContextTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

IsAuthenticatedProvider.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default IsAuthenticatedProvider;
