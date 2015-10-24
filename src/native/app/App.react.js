import Component from '../components/Component.react';
import Header from './Header.react';
import Menu from './Menu.react';
import React, {Navigator, PropTypes, View} from 'react-native';
import SideMenu from '../components/SideMenu.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import routes from '../routes';
import styles from './styles';
import {connect} from 'react-redux/native';

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  }

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  getTitle(route) {
    const {msg: {app: {links}}} = this.props;
    switch (route) {
      case routes.home: return links.home;
      case routes.todos: return links.todos;
    }
  }

  // TODO: Fluxify routing and make it universal with redux-router.
  // Store current route in storage.
  // https://github.com/rackt/redux-router/issues/63
  onRouteChange(route) {
    const {actions} = this.props;
    this.navigator.replace(routes[route]);
    actions.toggleSideMenu();
  }

  render() {
    const {actions, device, msg, ui} = this.props;

    const renderScene = (route, navigator) =>
      <View style={[styles.sceneView, route.style]}>
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={actions.toggleSideMenu}
        />
        <route.Page {...this.props} />
      </View>;

    const menu =
      <Menu msg={msg} onRouteChange={route => this.onRouteChange(route)} />;

    return (
      <SideMenu
        disableGestures
        isOpen={ui.isSideMenuOpen}
        menu={menu}
        onChange={actions.onSideMenuChange}
        platform={device.platform}
        style={styles.container}
        touchToClose
      >
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.todos}
          ref={c => this.navigator = c}
          renderScene={renderScene}
          style={styles.container}
        />
      </SideMenu>
    );
  }

}
