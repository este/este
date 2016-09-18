/* @flow */
import React from 'react';
import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';

const MatchWhenAuthorized = ({ component: Component, viewer, ...props }) => (
  <Match
    {...props}
    render={renderProps => (
      viewer ?
        <Component {...renderProps} />
      :
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: renderProps.location },
          }}
        />
    )}
  />
);

MatchWhenAuthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(MatchWhenAuthorized);
