import './App.scss';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import Theme from './Theme';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Container } from '../app/components';
import { connect } from 'react-redux';
import { locationShape } from 'react-router';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas = [
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

let App = ({ children, currentLocale, location }) => (
  <Theme>
    <Container>
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        titleTemplate="%s - Este.js"
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
      {/* Pass location to ensure header active links are updated. */}
      <Header location={location} />
      {children}
      <Footer />
    </Container>
  </Theme>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  currentLocale: React.PropTypes.string.isRequired,
  location: locationShape,
};

App = start(App);

export default connect(state => ({
  currentLocale: state.intl.currentLocale,
}))(App);
