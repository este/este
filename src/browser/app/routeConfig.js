// @flow
import type { State } from '../../common/types';
import HttpError from 'found/lib/HttpError';
import React from 'react';
import queryFirebase from './queryFirebase';
import { makeRouteConfig, Route } from 'found/lib/jsx';
import { onUsersPresence } from '../../common/users/actions';

// Pages
import App from './App';
import FieldsPage from '../fields/FieldsPage';
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import ProfilePage from '../me/ProfilePage';
import SettingsPage from '../me/SettingsPage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';
import UsersPage from '../users/UsersPage';

// Custom route to require viewer aka authenticated user.
const AuthorizedRoute = () => {};
AuthorizedRoute.createRoute = props => ({
  ...props,
  render: ({ Component, match, props }) => {
    const state: State = match.context.store.getState();
    if (!state.users.viewer) {
      // No redirect, just 401 Unauthorized, so we don't have to handle pesky
      // redirections manually. Check app/renderError.
      throw new HttpError(401);
    }
    return <Component {...props} />;
  },
});

const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={HomePage} />
    <Route path="fields" Component={FieldsPage} />
    <Route path="intl" Component={IntlPage} />
    <AuthorizedRoute path="me" Component={MePage}>
      <Route path="profile" Component={ProfilePage} />
      <Route path="settings" Component={SettingsPage} />
    </AuthorizedRoute>
    <Route path="offline" Component={OfflinePage} />
    <Route path="signin" Component={SignInPage} />
    <Route path="todos" Component={TodosPage} />
    <Route
      path="users"
      Component={UsersPage}
      getData={queryFirebase(
        ref => [ref.child('users-presence'), 'value', onUsersPresence],
        // ref => [ref.child('what-ever').limitToFirst(1), 'value', onWhatEver],
      )}
    />
  </Route>,
);

export default routeConfig;
