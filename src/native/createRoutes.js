/* @flow */
import linksMessages from '../common/app/linksMessages';

import Home from './home/HomePage';
import Intl from './intl/IntlPage';
import Me from './me/MePage';
import Offline from './offline/OfflinePage';
import SignIn from './auth/SignInPage';
import Todos from './todos/TodosPage';

// This is temporary pure React Native solution.
// TODO: Use jmurzy/react-router-native once released.

const createRoutes = () => ({
  tabs: {
    home: { component: Home, title: linksMessages.home },
    intl: { component: Intl, title: linksMessages.intl },
    me: { component: Me, title: linksMessages.me },
    offline: { component: Offline, title: linksMessages.offline },
    signIn: { component: SignIn, title: linksMessages.signIn },
    todos: { component: Todos, title: linksMessages.todos },
  },
});

export default createRoutes;
