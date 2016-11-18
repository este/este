/* @flow */
import type { State } from '../../common/types';
import Menu from './Menu';
import Page from './Page';
import R from 'ramda';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Container } from './components';
import { Match, Redirect } from 'react-router';
import { Platform, StatusBar } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

// Pages
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';

const App = ({ appMenuShown, appShowMenu, appStarted }) => {
  // TODO: Add splash screen.
  if (!appStarted) return null;
  return (
    <Container inverse>
      {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
        <StatusBar hidden={appMenuShown} />
      }
      <SideMenu
        isOpen={appMenuShown}
        menu={<Menu />}
        onChange={appShowMenu}
      >
        <Page exactly pattern="/" component={HomePage} />
        <Page pattern="/intl" component={IntlPage} />
        <Page pattern="/offline" component={OfflinePage} />
        <Page pattern="/signin" component={SignInPage} />
        <Page pattern="/todos" component={TodosPage} />
        <Page authorized pattern="/me" component={MePage} />
        {/* Miss does't work in React Native for some reason. */}
        {/* <Miss render={() => <Redirect to="/" />} /> */}
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
  appMenuShown: React.PropTypes.bool.isRequired,
  appShowMenu: React.PropTypes.func.isRequired,
  appStarted: React.PropTypes.bool.isRequired,
};

export default R.compose(
  start,
  connect(
    (state: State) => ({
      appMenuShown: state.app.menuShown,
      appStarted: state.app.started,
    }),
    { appShowMenu },
  ),
)(App);
