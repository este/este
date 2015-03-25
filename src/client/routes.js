import App from './components/app';
import Home from './components/home';
import Login from './components/login';
import Me from './components/me';
import NotFound from './components/notfound';
import React from 'react';
import Todos from './components/todos';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
    <Route handler={Login} name="login" />
    <Route handler={Me} name="me" />
    <Route handler={Todos} name="todos" />
  </Route>
);
