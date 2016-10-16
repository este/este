/* @flow */
import React from 'react';
import { Match as ReactRouterMatch, Redirect } from 'react-router';

const haveAccess = (viewer, authorized) => authorized ? viewer : true;

const Match = ({
  authorized,
  component: Component,
  render,
  ...props,
}) => (
  <ReactRouterMatch
    {...props}
    render={renderProps => (
      haveAccess(authorized) ?
        render ? render(renderProps) : <Component {...renderProps} />
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

Match.propTypes = {
  authorized: React.PropTypes.bool,
  component: React.PropTypes.func,
  render: React.PropTypes.func,
};

export default Match;
