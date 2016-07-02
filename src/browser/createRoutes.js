import App from './app/App.react';
import Fields from './fields/FieldsPage.react';
import Firebase from './firebase/FirebasePage.react';
import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Login from './auth/LoginPage.react';
import Me from './me/MePage.react';
import NotFound from './notfound/NotFoundPage.react';
import Offline from './offline/OfflinePage.react';
import Profile from './me/ProfilePage.react';
import React from 'react';
import Settings from './me/SettingsPage.react';
import Todos from './todos/TodosPage.react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(getState) {
  // Auth in Este is lazy, requireViewer allows us to render stale data when
  // offline and enforce login later on specific action.
  const requireViewer = (nextState, replace) => {
    if (getState().users.viewer) return;
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Login} path="login" />
      <Route component={Intl} path="intl" />
      <Route component={Fields} path="fields" />
      <Route component={Firebase} path="firebase" />
      <Route component={Me} onEnter={requireViewer} path="me">
        <Route component={Profile} path="profile" />
        <Route component={Settings} path="settings" />
      </Route>
      <Route component={Todos} path="todos" />
      <Route component={Offline} path="offline" />
      <Route component={NotFound} path="*" />
    </Route>
  );
}
