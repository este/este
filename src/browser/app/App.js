/* @flow */
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import favicon from '../../common/app/favicon';
import { setDevice } from '../../common/device/actions';
import { Container } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../home/HomePage';
import NotFound from '../notfound/NotFoundPage';

@connect(null, (dispatch) => bindActionCreators({ setDevice }, dispatch))
export default class App extends Component {
  static propTypes = {
    setDevice: RPT.func.isRequired,
  }

  state = {
    mqls: [],
  }

  componentWillMount() {
    if (!global.window) return;

    const mqls = [
      window.matchMedia('(max-width: 480px)'),
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(min-width: 992px)'),
    ];
    mqls.map(x => x.addListener(() => this.mediaQueryChanged()));

    this.setState({ mqls });
    setTimeout(() => this.mediaQueryChanged(), 5);
  }

  mediaQueryChanged() {
    const { setDevice } = this.props;
    const { mqls } = this.state;
    let device = 'desktop';
    if (mqls[1] && mqls[1].matches) device = 'tablet';
    if (mqls[0] && mqls[0].matches) device = 'mobile';
    setDevice(device);
  }

  render() {
    return (
      <ThemeProvider theme={themes.initial}>
        <Container>
          <Helmet
            htmlAttributes={{ lang: 'cs' }}
            meta={[
              { charset: 'utf-8' },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
              },
              {
                'http-equiv': 'x-ua-compatible',
                content: 'ie=edge',
              },
              {
                name: 'description',
                content: 'MI-NUR Cinema Project',
              },
              ...favicon.meta,
            ]}
            link={[
              ...favicon.link,
            ]}
          />
          <Header />
          <Match exactly pattern="/" component={Home} />
          <Miss component={NotFound} />
          <Footer />
        </Container>
      </ThemeProvider>
    );
  }
}
