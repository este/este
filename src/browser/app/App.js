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
import { Match, Miss, Redirect } from 'react-router';
import { ThemeProvider } from '../../common/app/components';
import { connect } from 'react-redux';

// Pages
import Fields from '../fields/FieldsPage';
import Firebase from '../firebase/FirebasePage';
import Home from '../home/HomePage';
import Intl from '../intl/IntlPage';
import Me from '../me/MePage';
import NotFound from '../notfound/NotFoundPage';
import Offline from '../offline/OfflinePage';
import SignIn from '../auth/SignInPage';
import Todos from '../todos/TodosPage';

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

let MatchWhenAuthorized = ({ component: Component, viewer, ...props }) => (
  <Match
    {...props}
    render={renderProps => (
      viewer ?
        <Component {...renderProps} />
      :
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: renderProps.location },
          }}
        />
    )}
  />
);

MatchWhenAuthorized.propTypes = {
  component: React.PropTypes.func.isRequired,
  viewer: React.PropTypes.object,
};

MatchWhenAuthorized = connect(state => ({
  viewer: state.users.viewer,
}))(MatchWhenAuthorized);

let App = ({ currentLocale, currentTheme }) => (
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
            content: 'Dev stack and starter kit for functional and universal React apps',
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />
      <Header />
      <Match exactly pattern="/" component={Home} />
      <Match pattern="/fields" component={Fields} />
      <Match pattern="/firebase" component={Firebase} />
      <Match pattern="/intl" component={Intl} />
      <MatchWhenAuthorized pattern="/me" component={Me} />
      <Match pattern="/offline" component={Offline} />
      <Match pattern="/signin" component={SignIn} />
      <Match pattern="/todos" component={Todos} />
      <Miss component={NotFound} />
      <Footer />
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(state => ({
  currentLocale: state.intl.currentLocale,
  currentTheme: state.themes.currentTheme,
}))(App);

export default start(App);
