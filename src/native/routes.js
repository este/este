import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Offline from './offline/OfflinePage.react';
import SignIn from './auth/SignInPage.react';
import Todos from './todos/TodosPage.react';

export default {
  home: {
    Page: Home
  },
  intl: {
    Page: Intl
  },
  offline: {
    Page: Offline
  },
  signIn: {
    Page: SignIn
  },
  todos: {
    Page: Todos
  },
};
