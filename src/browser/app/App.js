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
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          ...bootstrap4Metas,
          {
            name: 'description',
            content: 'Dev stack and starter kit for functional and universal React apps',
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />
      <Header />
      {children}
      <Footer />
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
