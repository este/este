import App from './app/app.react';
import Home from './home/index.react';
import Login from './auth/index.react';
import Me from './me/index.react';
import NotFound from './notfound/index.react';
import React from 'react';
import Todos from './todos/index.react';
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {

  function requireAuth(nextState, replaceState) {
    const loggedIn = getState().users.viewer;
    if (!loggedIn) {
      replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
  }

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Login} path="login" />
      <Route component={Me} onEnter={requireAuth} path="me" />
      <Route component={Todos} path="todos" />
      <Route component={NotFound} path="*" />
    </Route>
  );

}
