import App from './app/app.react';
import Examples from './pages/examples.react';
import Home from './pages/home.react';
import Login from './pages/login.react';
import Me from './pages/me.react';
import NotFound from './pages/notfound.react';
import React from 'react';
import Todos from './pages/todos.react';
import {Route} from 'react-router';

export default (
  <Route component={App}>
    <Route component={Home} path="/" />
    <Route component={Examples} path="examples" />
    <Route component={Login} path="login" />
    <Route component={Me} path="me" />
    <Route component={Todos} path="todos" />
    <Route component={NotFound} path="*" />
  </Route>
);
