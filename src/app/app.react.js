import * as state from '../state';
import Component from '../components/component.react';
import Header from '../components/header.react';
import Menu from './menu.react';
import React from 'react-native';
import {routes, defaultRoute} from '../routes';
import SideMenu from 'react-native-side-menu';
import {
  StatusBarIOS,
  View,
  Navigator
} from 'react-native';

import appStyle from './app.style';

import '../todos/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
    this.onItemSelected = this.onItemSelected.bind(this);
    this.handleStatusBarAppearance = this.handleStatusBarAppearance.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getRoute(page) {
    return routes[page];
  }

  toggleMenu() {
    this.refs.menu.toggleMenu();
  }

  componentWillMount() {
    state.appState.on('change', () => {
      this.setState(this.getState()); //eslint-disable-line react/no-did-mount-set-state
    });
  }

  getState() {
     return {
       pendingActions: state.pendingActionsCursor(),
       todos: state.todosCursor()
     };
   }

  onButtonPressed() {
    this.refs.menu.toggleMenu();
  }

  handleStatusBarAppearance() {
    StatusBarIOS.setHidden(!(this.refs.menu.isOpen || false), true);
  }

  onItemSelected(itemKey) {
    const navigator = this.refs.navigator;
    const route = this.getRoute(itemKey);

    if (route) {
      const currentRoutes = navigator.getCurrentRoutes();
      let currentRoute = currentRoutes[currentRoutes.length - 1];

      // Transition only when routes are different
      if (currentRoute.component !== route.component)
        this.refs.navigator.replace(route);
    }

  }

  configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    var Handler = route.component;

    const navigation = {
      ...navigator,
      transitionTo: (route) => navigator.push(this.getRoute(route)),
      getRoute: this.getRoute.bind(this),
      toggleMenu: this.toggleMenu.bind(this)
    };

    return (
      <View style={[appStyle.sceneView, route.style]}>
        <Handler navigation={navigation} {...this.state} />
      </View>
    );
  }

  render() {
    return (
      <SideMenu
        animation='spring'
        disableGestures={true}
        menu={<Menu onItemSelected={this.onItemSelected}/>}
        onChange={this.handleStatusBarAppearance}
        ref='menu'
        style={appStyle.container}>

        <Navigator
          configureScene={this.configureScene}
          initialRoute={this.getRoute(defaultRoute)}
          navigationBar={<Header menuAction={this.toggleMenu} />}
          ref='navigator'
          renderScene={this.renderScene}
          style={appStyle.container}
        />

      </SideMenu>
    );

  }

}

export default App;
