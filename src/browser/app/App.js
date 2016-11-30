/* @flow */
import type { State } from '../../common/types';
import type { Theme } from './themes';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import R from 'ramda';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Match } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';
import { createComponent, ThemeProvider } from 'react-fela';

// Pages
// import FieldsPage from '../fields/FieldsPage';
// import UsersPage from '../users/UsersPage';
// import HomePage from '../home/HomePage';
// import IntlPage from '../intl/IntlPage';
// import MePage from '../me/MePage';
// import NotFoundPage from '../notfound/NotFoundPage';
// import OfflinePage from '../offline/OfflinePage';
// import SignInPage from '../auth/SignInPage';
// import TodosPage from '../todos/TodosPage';

const Container = createComponent((props: { theme: Theme }) => ({
  margin: 'auto',
  maxWidth: 1024,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // 100vh (not 100%) because it's absolute to the viewport
  paddingLeft: `${props.theme.scales.medium}px`,
  paddingRight: `${props.theme.scales.medium}px`,
}));

const Page = createComponent(() => ({
  flex: 1, // Flex 1 on the page makes footer sticky.
}));

type AppProps = {
  currentLocale: string,
  currentTheme: ?string,
};

const App = ({ currentLocale, currentTheme }: AppProps) => (
  <ThemeProvider
    // key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    theme={themes[currentTheme || 'initial']}
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
        ]}
      />
        <Header>Header</Header>
        <Page>
          Ahoj
          {/*
            <Match exactly pattern="/" component={HomePage} />
            <Match pattern="/fields" component={FieldsPage} />
            <Match pattern="/users" component={UsersPage} />
            <Match pattern="/intl" component={IntlPage} />
            <Match pattern="/offline" component={OfflinePage} />
            <Match pattern="/signin" component={SignInPage} />
            <Match pattern="/todos" component={TodosPage} />
            <Match authorized pattern="/me" component={MePage} />
            <Miss component={NotFoundPage} />*/}
        </Page>
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
