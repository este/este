// @flow
import HttpError from 'found/lib/HttpError';
import React from 'react';
import { makeRouteConfig, Route } from 'found/lib/jsx';

// Pages
import App from './App';
import FieldsPage from '../fields/FieldsPage';
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';
import UsersPage from '../users/UsersPage';

const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={HomePage} />
    <Route path="fields" Component={FieldsPage} />
    <Route path="intl" Component={IntlPage} />
    <Route path="me" Component={MePage} />
    <Route path="offline" Component={OfflinePage} />
    <Route path="signin" Component={SignInPage} />
    <Route path="todos" Component={TodosPage} />
    <Route path="users" Component={UsersPage} />
  </Route>,
);

export default routeConfig;
