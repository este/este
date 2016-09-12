/* @flow */
import linksMessages from '../common/app/linksMessages';

import Home from './home/HomePage';
import Intl from './intl/IntlPage';
import Me from './me/MePage';
import NotFound from './notfound/NotFoundPage';
import Offline from './offline/OfflinePage';
import SignIn from './auth/SignInPage';
import Todos from './todos/TodosPage';

// Note Este doesn't use any React Native routing library. There are several
// almost ready, but I don't think we are there yet. With React Native API,
// we have everything explicit and under the control. Developer experience ftw.
//  - react-router-native is nice, but it depends on React Router 3, which will
//    be replaced with brand new universal React Router 4. One day.
//  - ex-navigation is nice, but it looks immature. API will change.
//  - react-native-router-flux is nice, but it's legacy with a lot of issues.

const createRoutes = (getState: Function) => ({ // eslint-disable-line no-unused-vars
  get(key: string) {
    const route = this[key] || this.notFound;
    // if (route.foo && !getState().users.viewer) { ... }
    return route;
  },
  // Tabs.
  home: { Component: Home, title: linksMessages.home },
  intl: { Component: Intl, title: linksMessages.intl },
  me: { Component: Me, title: linksMessages.me },
  notFound: { Component: NotFound, title: linksMessages.notFound },
  offline: { Component: Offline, title: linksMessages.offline },
  signIn: { Component: SignIn, title: linksMessages.signIn },
  todos: { Component: Todos, title: linksMessages.todos },
});

export default createRoutes;
