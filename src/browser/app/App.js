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
import { Box } from '../../common/components';
import { ThemeProvider } from 'react-fela';
import { compose } from 'ramda';
import { connect } from 'react-redux';

type AppProps = {
  children: any,
  currentLocale: string,
  themeName: string,
  theme: Theme,
};

const App = (
  {
    children,
    currentLocale,
    theme,
    themeName,
  }: AppProps,
) => (
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
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
            ...favicon.meta,
          ]}
          link={[...favicon.link]}
        />
        <Header />
        <Box
          flex={1} // make footer sticky
        >
          {children}
        </Box>
        <Footer />
      </Container>
    </Baseline>
  </ThemeProvider>
);

export default compose(
  connect((state: State) => ({
    currentLocale: state.intl.currentLocale,
    theme: themes[state.app.currentTheme] || themes.defaultTheme,
    themeName: state.app.currentTheme,
  })),
  start,
)(App);
