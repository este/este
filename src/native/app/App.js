/* @flow */
import Menu from './Menu';
import Page from './Page';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Container } from './components';
import { Match, Redirect } from 'react-router';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { showMenu } from '../../common/app/actions';

// Pages
import Home from '../home/HomePage';
import Intl from '../intl/IntlPage';
import Me from '../me/MePage';
import Offline from '../offline/OfflinePage';
import SignIn from '../auth/SignInPage';
import Todos from '../todos/TodosPage';

let App = ({
  menuShown,
  showMenu,
  storageLoaded,
}) => {
  // TODO: Add splash screen.
  if (!storageLoaded) return null;
  return (
    <Container inverse>
      {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
        <StatusBar hidden={menuShown} />
      }
      <SideMenu
        isOpen={menuShown}
        menu={<Menu />}
        onChange={showMenu}
      >
        <Page exactly pattern="/" component={Home} />
        <Page pattern="/intl" component={Intl} />
        <Page pattern="/offline" component={Offline} />
        <Page pattern="/signin" component={SignIn} />
        <Page pattern="/todos" component={Todos} />
        <Page authorized pattern="/me" component={Me} />
        {/* Miss does't work yet. */}
        {/* github.com/ReactTraining/react-router/issues/3905 */}
        {/* <Miss render={() => <Redirect to="/" />} /> */}
        {/* This is silly workaround. */}
        <Match
          pattern="/"
          render={({ location: { pathname } }) => {
            const urls = ['/', '/intl', '/offline', '/signin', '/todos', '/me'];
            if (urls.indexOf(pathname) !== -1) return null;
            return (
              <Redirect to="/" />
            );
          }}
        />
      </SideMenu>
    </Container>
  );
};

App.propTypes = {
  menuShown: React.PropTypes.bool.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  storageLoaded: React.PropTypes.bool.isRequired,
};

App = connect(state => ({
  menuShown: state.app.menuShown,
  storageLoaded: state.app.storageLoaded,
}), { showMenu })(App);

export default start(App);
