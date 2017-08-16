// @flow
import React from 'react';
import PropTypes from 'prop-types';

// isAuthenticated is a cross-cutting concern. It's the same for the whole app
// so it doesn't make sense to pass it via props, which are component specific.

class IsAuthenticatedProvider extends React.Component {
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
