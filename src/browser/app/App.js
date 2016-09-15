/* @flow */
import './App.scss';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Container } from '../app/components';
import { ThemeProvider } from '../../common/app/components';
import { connect } from 'react-redux';
import Flexbox from 'flexbox-react';

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

let App = ({ children, currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // The same issue github.com/yahoo/react-intl/issues/234
    theme={themes[currentTheme] || themes.initial}
  >
    <Container>
      <Flexbox
        flexDirection="column"
        minHeight="100vh"
        minWidth="100vw"
        maxWidth="1195px"
      >
        <Helmet
          htmlAttributes={{ lang: currentLocale }}
          meta={[
            ...bootstrap4Metas,
            {
              name: 'description',
              content: 'bespoke Fashion Designs Blog.',
            },
            ...favicon.meta,
          ]}
          link={[
            ...favicon.link,
          ]}
        />
        <Header />
        <Flexbox
          element="main"
          minWidth="100vw"
          paddingLeft="10px"
          flex="1 0 auto"
        >

          {children}

        </Flexbox>

        <Flexbox
          flex="0.1 0 auto"
          minWidth="100vw"
        >

          <Footer
            minWidth="100vw"
          />

        </Flexbox>
      </Flexbox>
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(state => ({
  currentLocale: state.intl.currentLocale,
  currentTheme: state.themes.currentTheme,
}))(App);

export default start(App);
