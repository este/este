import App from './app/App.react';
import Auth from './auth/Page.react';
import Home from './home/Page.react';
import Me from './me/Page.react';
import Profile from './profile/Page.react';
import ProfileTabBio from './profile/TabBio.react.js';
import ProfileTabConnect from './profile/TabConnect.react.js';
import NotFound from './components/NotFound.react';
import React from 'react';
import Todos from './todos/Page.react';
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {

  function requireAuth(nextState, replaceState) {
    const loggedInUser = getState().users.viewer;
    if (!loggedInUser) {
      replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
  }

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Auth} path="login" />
      <Route component={Me} onEnter={requireAuth} path="me" />
      <Route component={Todos} path="todos" />
      <Route component={Profile} path="profile/:userSlug">
        <IndexRoute component={ProfileTabBio}/>
        <Route component={ProfileTabConnect} path="connect"/>
      </Route>
      <Route component={NotFound} path="*" />
    </Route>
  );

}
