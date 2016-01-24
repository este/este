import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, {Navigator, PropTypes, StatusBarIOS, View} from 'react-native';
import SideMenu from 'react-native-side-menu';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import routes from '../routes';
import styles from './styles';
import {connect} from 'react-redux';

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
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
    const {actions} = this.props;
    this.navigator.replace(routes[route]);
    actions.toggleSideMenu();
  }

  onSideMenuChange(isOpen) {
    const {actions, device} = this.props;
    if (device.platform === 'ios')
      StatusBarIOS.setHidden(isOpen, true);
    actions.onSideMenuChange(isOpen);
  }

  getTitle(route) {
    const {msg: {app: {links}}} = this.props;
    switch (route) {
      case routes.home: return links.home;
      case routes.todos: return links.todos;
    }
  }

  render() {
    const {actions, msg, ui} = this.props;

    const renderScene = route =>
      <View style={[styles.sceneView, route.style]}>
        <Header
          title={this.getTitle(route)}
          toggleSideMenu={actions.toggleSideMenu}
        />
        <route.Page {...this.props} />
      </View>;

    const menu =
      <Menu msg={msg} onRouteChange={this.onRouteChange} />;

    return (
      <SideMenu
        disableGestures
        isOpen={ui.isSideMenuOpen}
        menu={menu}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
