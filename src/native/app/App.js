// @flow
import type { State } from '../../common/types';
import * as themes from '../themes';
import Menu from './Menu';
import Page from './Page';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import common from '../../common/app/common';
import { Baseline } from '../components';
import { Box } from '../../common/components';
import { Match, Redirect } from 'react-router';
import { Platform, StatusBar } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Pages
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';

type AppProps = {
  appMenuShown: boolean,
  appShowMenu: typeof appShowMenu,
  appStarted: boolean,
};

const App = (
  {
    appMenuShown,
    appShowMenu,
    appStarted,
  }: AppProps,
) => {
  // TODO: Add splash screen.
  if (!appStarted) return null;

  return (
    <Box flex={1}>
      {Platform.OS === 'ios' &&
        <StatusBar
          hidden={
            appMenuShown // Because iOS StatusBar is an overlay.
          }
        />}
      <SideMenu isOpen={appMenuShown} menu={<Menu />} onChange={appShowMenu}>
        <Page exactly pattern="/" component={HomePage} />
        <Page pattern="/intl" component={IntlPage} />
        <Page pattern="/offline" component={OfflinePage} />
        <Page pattern="/todos" component={TodosPage} />
        <Page pattern="/signin" component={SignInPage} />
        <Page authorized pattern="/me" component={MePage} />
        <Match
          pattern="/"
          render={({ location: { pathname } }) => {
            const urls = ['/', '/intl', '/offline', '/signin', '/todos', '/me'];
            if (urls.indexOf(pathname) !== -1) return null;
            return <Redirect to="/" />;
          }}
        />
      </SideMenu>
      <Baseline />
    </Box>
  );
};

export default compose(
  common({ themes }),
  connect(
    (state: State) => ({
      appMenuShown: state.app.menuShown,
      appStarted: state.app.started,
    }),
    { appShowMenu },
  ),
)(App);
