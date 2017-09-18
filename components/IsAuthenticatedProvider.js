// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

// We can detect whether user is authenticated or not via Viewer.user query.
// But because we need such information in Page for menu etc., it would require
// the server side roundtrip for all pages. We can safely use cookie instead.

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
