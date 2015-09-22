import App from './app/app.react';
import Home from './pages/home.react';
import Login from './pages/auth.react';
import Me from './pages/me.react';
import NotFound from './pages/notFound.react';
import React from 'react';
import Todos from './pages/todos.react';
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
