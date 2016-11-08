import * as themes from './themes';
import AboutUs from '../about/Page';
import favicon from '../../common/app/favicon';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import Login from '../login/Page';
import Menu from '../mainmenu/Menu';
import News from '../news/Page';
import NotFound from '../notfound/NotFoundPage';
import Profile from '../profile/Page';
import Program from '../program/Program';
import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import Reservation from '../reservation/Page';
import Search from '../search/Page';
import UnsupportedDevice from './UnsupportedDevice';
import { connect } from 'react-redux';
import { Container } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { setDevice } from '../../common/device/actions';

@connect(state => ({
  device: state.device.get('device'),
  menuShown: state.app.get('menuShown'),
}),
{ setDevice })
export default class App extends Component {
  static propTypes = {
    device: RPT.string,
    setDevice: RPT.func.isRequired,
    menuShown: RPT.bool,
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
    const { device, menuShown } = this.props;

    if (device !== 'mobile') return <Match pattern="/" component={UnsupportedDevice} />;

    return (
      <ThemeProvider theme={themes.initial}>
        <Container>
          <Helmet
            htmlAttributes={{ lang: 'cs' }}
            meta={[
              { charset: 'utf-8' },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
              },
              {
                'http-equiv': 'x-ua-compatible',
                content: 'ie=edge',
              },
              {
                name: 'description',
                content: 'MI-NUR Cinema Project',
              },
              {
                name: 'robots',
                content: 'noindex',
              },
              ...favicon.meta,
            ]}
            link={[
              ...favicon.link,
            ]}
          />
          {menuShown && <Menu />}
          <Header />
          <div style={style.wrapper}>
            <Match exactly pattern="/" component={Program} />
            <Match exactly pattern="/about-us" component={AboutUs} />
            <Match exactly pattern="/login" component={Login} />
            <Match exactly pattern="/news" component={News} />
            <Match exactly pattern="/profile" component={Profile} />
            <Match exactly pattern="/reservation" component={Reservation} />
            <Match exactly pattern="/search" component={Search} />
            <Miss component={NotFound} />
          </div>
          <Footer />
        </Container>
      </ThemeProvider>
    );
  }
}

const style = {
  wrapper: {
    paddingTop: '50px'
  }
};
