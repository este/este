import * as uiActions from '../../common/ui/actions';
import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, { PropTypes } from 'react';
import SideMenu from 'react-native-side-menu';
import linksMessages from '../../common/app/linksMessages';
import routes from '../routes';
import start from '../../common/app/start';
import styles from './styles';
import { Navigator, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

class App extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    isSideMenuOpen: PropTypes.bool.isRequired,
    onSideMenuChange: PropTypes.func.isRequired,
    storageLoaded: PropTypes.bool.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
  };

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  constructor(props) {
    super(props);
    this.onNavigatorRef = this.onNavigatorRef.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onNavigatorRef(component) {
    this.navigator = component;
  }

  onRouteChange(route) {
    this.navigator.replace(routes[route]);
    this.props.toggleSideMenu();
  }

  getTitle(route) {
    const { intl } = this.props;
    switch (route) {
      case routes.home: return intl.formatMessage(linksMessages.home);
      case routes.intl: return intl.formatMessage(linksMessages.intl);
      case routes.offline: return intl.formatMessage(linksMessages.offline);
      case routes.signIn: return intl.formatMessage(linksMessages.signIn);
      case routes.todos: return intl.formatMessage(linksMessages.todos);
    }
    throw new Error('Route not found.');
  }

  renderScene(route) {
    const { isSideMenuOpen, toggleSideMenu } = this.props;
    return (
      <View style={[styles.sceneView, route.style]}>
        <StatusBar hidden={isSideMenuOpen} />
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={toggleSideMenu}
        />
        <route.Page />
      </View>
    );
  }

  render() {
    const { isSideMenuOpen, onSideMenuChange, storageLoaded } = this.props;
    // Don't render anything until AsyncStorage is loaded to prevent flashes
    // of unloaded content.
    if (!storageLoaded) return null;

    return (
      <SideMenu
        disableGestures
        isOpen={isSideMenuOpen}
        menu={
          <Menu onRouteChange={this.onRouteChange} />
        }
        onChange={onSideMenuChange}
        style={styles.container}
      >
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.home}
          ref={this.onNavigatorRef}
          renderScene={this.renderScene}
          style={styles.container}
        />
      </SideMenu>
    );
  }

}

App = injectIntl(App);

App = connect(state => ({
  isSideMenuOpen: state.ui.isSideMenuOpen,
  storageLoaded: state.app.storageLoaded,
}), uiActions)(App);

export default start(App);
