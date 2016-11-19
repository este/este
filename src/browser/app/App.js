/* @flow */
import type { State } from '../../common/types';
import './App.css';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import R from 'ramda';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Box, Container, Flex } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';

// Pages
import FieldsPage from '../fields/FieldsPage';
import UsersPage from '../users/UsersPage';
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';

const styles = {
  container: {
    minHeight: '100vh',
  },
  page: {
    flex: 1,
  },
};

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

const App = ({ currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    theme={themes[currentTheme] || themes.initial}
  >
    <Container>
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          ...bootstrap4Metas,
          {
            name: 'description',
            content: `Starter kit for universal full–fledged React apps. One stack
              for browser, mobile, server.`,
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />
      <Flex flexColumn style={styles.container}>
        <Header />
        <Box style={styles.page}>
          <Match exactly pattern="/" component={HomePage} />
          <Match pattern="/fields" component={FieldsPage} />
          <Match pattern="/users" component={UsersPage} />
          <Match pattern="/intl" component={IntlPage} />
          <Match pattern="/offline" component={OfflinePage} />
          <Match pattern="/signin" component={SignInPage} />
          <Match pattern="/todos" component={TodosPage} />
          <Match authorized pattern="/me" component={MePage} />
          <Miss component={NotFoundPage} />
        </Box>
        <Footer />
      </Flex>
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

export default R.compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      currentTheme: state.themes.currentTheme,
    }),
  ),
  start,
)(App);
