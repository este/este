/* @flow weak */
import React from 'react';

const withRouting = (WrappedComponent) => {
  const Wrapper = (props, { routing }) => (
    <WrappedComponent {...props} routing={routing} />
  );
  Wrapper.contextTypes = {
    routing: React.PropTypes.object,
  };
  return Wrapper;
};

export default withRouting;
