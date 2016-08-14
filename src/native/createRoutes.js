import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Me from './me/MePage.react';
import Offline from './offline/OfflinePage.react';
import SignIn from './auth/SignInPage.react';
import Todos from './todos/TodosPage.react';
import linksMessages from '../common/app/linksMessages';

// This is temporary pure React Native solution.
// TODO: Use jmurzy/react-router-native once released.

export default function createRoutes() {
  return {
    tabs: {
      home: { component: Home, title: linksMessages.home },
      intl: { component: Intl, title: linksMessages.intl },
      me: { component: Me, title: linksMessages.me },
      offline: { component: Offline, title: linksMessages.offline },
      signIn: { component: SignIn, title: linksMessages.signIn },
      todos: { component: Todos, title: linksMessages.todos },
    },
  };
}
