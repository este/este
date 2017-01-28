// @flow
import type { State } from '../../common/types';
import type { Theme } from '../../common/themes/types';
import * as themes from '../themes';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Baseline } from '../components';
import { Box, Match } from '../../common/components';
import { Miss } from 'react-router';
import { ThemeProvider } from 'react-fela';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Pages
import FieldsPage from '../fields/FieldsPage';
import HomePage from '../home/HomePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';
import UsersPage from '../users/UsersPage';

type AppProps = {
  currentLocale: string,
  themeName: string,
  theme: Theme,
};

const App = ({
  currentLocale,
  theme,
  themeName,
}: AppProps) => (
  <ThemeProvider
    key={themeName} // Enforce rerender.
    theme={theme}
  >
    <Baseline lineHeight={theme.typography.lineHeight}>
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
          ]}
        />
        <Header />
        <Box
          flex={1} // make footer sticky
        >
          <Match exactly pattern="/" component={HomePage} />
          <Match pattern="/users" component={UsersPage} />
          <Match pattern="/todos" component={TodosPage} />
          <Match pattern="/fields" component={FieldsPage} />
          <Match pattern="/intl" component={IntlPage} />
          <Match pattern="/offline" component={OfflinePage} />
          <Match pattern="/signin" component={SignInPage} />
          <Match authorized pattern="/me" component={MePage} />
          <Miss component={NotFoundPage} />
        </Box>
        <Footer />
      </Container>
    </Baseline>
  </ThemeProvider>
);

export default compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      theme: themes[state.app.currentTheme] || themes.defaultTheme,
      themeName: state.app.currentTheme,
    }),
  ),
  start,
)(App);
