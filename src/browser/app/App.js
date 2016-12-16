/* @flow */
import type { State } from '../../common/types';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import R from 'ramda';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Match } from '../../common/app/components';
// import { Miss } from 'react-router';
import { Box, Container, ThemeProvider } from './components';
import { connect } from 'react-redux';

// Pages
// import FieldsPage from '../fields/FieldsPage';
// import UsersPage from '../users/UsersPage';
import HomePage from '../home/HomePage';
// import IntlPage from '../intl/IntlPage';
// import MePage from '../me/MePage';
// import NotFoundPage from '../notfound/NotFoundPage';
// import OfflinePage from '../offline/OfflinePage';
// import SignInPage from '../auth/SignInPage';
// import TodosPage from '../todos/TodosPage';

type AppProps = {
  currentLocale: string,
  currentTheme: ?string,
};

const theme = (currentTheme) =>
  themes[currentTheme || 'defaultTheme'] || themes.defaultTheme;

const App = ({ currentLocale, currentTheme }: AppProps) => (
  <ThemeProvider
    // TODO: Do we need it?
    // key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    theme={theme(currentTheme)}
  >
    <Container>
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
          { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
          // Test vertical rhythm.
          {
            href: `http://basehold.it/${theme(currentTheme).typography.lineHeight}/0/0/0/0.1`,
            rel: 'stylesheet',
          },
        ]}
      />
        <Header />
        <Box
          flex={1} // make footer sticky
        >
          <Match exactly pattern="/" component={HomePage} />
          {/*  <Match pattern="/fields" component={FieldsPage} />
            <Match pattern="/users" component={UsersPage} />
            <Match pattern="/intl" component={IntlPage} />
            <Match pattern="/offline" component={OfflinePage} />
            <Match pattern="/signin" component={SignInPage} />
            <Match pattern="/todos" component={TodosPage} />
            <Match authorized pattern="/me" component={MePage} />
            <Miss component={NotFoundPage} />*/}
        </Box>
        <Footer />
    </Container>
  </ThemeProvider>
);

export default R.compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      currentTheme: state.themes.currentTheme,
    }),
  ),
  start,
)(App);
