import Header from './Header.react';
import Menu from './Menu.react';
import React, { PropTypes, Component } from 'react';
import SideMenu from 'react-native-side-menu';
import linksMessages from '../../common/app/linksMessages';
import routes from '../routes';
import start from '../../common/app/start';
import theme from './theme';
import { Container } from './components';
import { Navigator, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  app: {
    backgroundColor: theme.inverseBackgroundColor,
    flex: 1,
  },
});

class App extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    storageLoaded: PropTypes.bool.isRequired,
  };

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  constructor() {
    super();
    this.state = {
      sideMenuOpen: false,
    };
    this.onNavigatorRef = this.onNavigatorRef.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.onSideMenuChange = this.onSideMenuChange.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  onNavigatorRef(component) {
    this.navigator = component;
  }

  onRouteChange(route) {
    this.navigator.replace(routes[route]);
    this.toggleSideMenu();
  }

  onSideMenuChange(sideMenuOpen) {
    this.setState({ sideMenuOpen });
  }

  getTitle(route) {
    const { intl } = this.props;
    switch (route) {
      case routes.home: return intl.formatMessage(linksMessages.home);
      case routes.intl: return intl.formatMessage(linksMessages.intl);
      case routes.me: return intl.formatMessage(linksMessages.me);
      case routes.offline: return intl.formatMessage(linksMessages.offline);
      case routes.signIn: return intl.formatMessage(linksMessages.signIn);
      case routes.todos: return intl.formatMessage(linksMessages.todos);
    }
    throw new Error('Route not found.');
  }

  toggleSideMenu() {
    this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }

  renderScene(route) {
    const { sideMenuOpen } = this.state;
    return (
      <Container>
        {Platform.OS === 'ios' && // Required only for iOS.
          <StatusBar hidden={sideMenuOpen} />
        }
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={this.toggleSideMenu}
        />
        <route.Page navigator={this.navigator} />
      </Container>
    );
  }

  render() {
    const { storageLoaded } = this.props;
    const { sideMenuOpen } = this.state;
    if (!storageLoaded) return null;

    return (
      <View style={styles.app}>
        <SideMenu
          isOpen={sideMenuOpen}
          menu={<Menu onRouteChange={this.onRouteChange} />}
          onChange={this.onSideMenuChange}
        >
          <Navigator
            configureScene={App.configureScene}
            initialRoute={routes.home}
            ref={this.onNavigatorRef}
            renderScene={this.renderScene}
          />
        </SideMenu>
      </View>
    );
  }

}

App = injectIntl(App);

App = connect(state => ({
  storageLoaded: state.app.storageLoaded,
}))(App);

export default start(App);
