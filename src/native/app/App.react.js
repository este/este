import * as uiActions from '../../common/ui/actions';
import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, { Navigator, PropTypes, StatusBarIOS, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import routes from '../routes';
import styles from './styles';
import { connect } from 'react-redux';

class App extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
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
    this.onSideMenuChange = this.onSideMenuChange.bind(this);
  }

  onNavigatorRef(component) {
    this.navigator = component;
  }

  onRouteChange(route) {
    this.navigator.replace(routes[route]);
    this.props.toggleSideMenu();
  }

  onSideMenuChange(isOpen) {
    const { device, onSideMenuChange } = this.props;
    if (device.platform === 'ios') {
      StatusBarIOS.setHidden(isOpen, true);
    }
    onSideMenuChange(isOpen);
  }

  getTitle(/* route */) {
    return 'none';
    // const { links } = this.props;
    // switch (route) {
    //   case routes.home: return links.home;
    //   case routes.todos: return links.todos;
    // }
    // throw new Error('Route not found.');
  }

  render() {
    const { toggleSideMenu, ui } = this.props;

    const renderScene = route =>
      <View style={[styles.sceneView, route.style]}>
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={toggleSideMenu}
        />
        <route.Page />
      </View>;

    return (
      <SideMenu
        disableGestures
        isOpen={ui.isSideMenuOpen}
        menu={
          <Menu onRouteChange={this.onRouteChange} />
        }
        onChange={this.onSideMenuChange}
        style={styles.container}
      >
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.home}
          ref={this.onNavigatorRef}
          renderScene={renderScene}
          style={styles.container}
        />
      </SideMenu>
    );
  }

}

App = connect(state => ({
  device: state.device,
  ui: state.ui
}), uiActions)(App);

export default App;
