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
    device: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    onSideMenuChange: PropTypes.func.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
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
      case routes.todos: return intl.formatMessage(linksMessages.todos);
    }
    throw new Error('Route not found.');
  }

  renderScene(route) {
    const { toggleSideMenu, ui } = this.props;
    return (
      <View style={[styles.sceneView, route.style]}>
        <StatusBar hidden={ui.isSideMenuOpen} />
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={toggleSideMenu}
        />
        <route.Page />
      </View>
    );
  }

  render() {
    const { onSideMenuChange, ui } = this.props;

    return (
      <SideMenu
        disableGestures
        isOpen={ui.isSideMenuOpen}
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
  device: state.device,
  ui: state.ui
}), uiActions)(App);

export default start(App);
