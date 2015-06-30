import * as state from '../state';
import Component from '../components/component.react';
import Menu from './menu.react';
import React from 'react-native';
import routes from '../routes';
import SideMenu from 'react-native-side-menu';
import {
  StatusBarIOS,
  View,
  Navigator
} from 'react-native';

import appStyle from './app.style';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
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
       auth: state.authCursor(),
       pendingActions: state.pendingActionsCursor(),
       todos: state.todosCursor(),
       users: state.usersCursor()
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
        menu={<Menu onItemSelected={this.onItemSelected.bind(this)}/>}
        onChange={this.handleStatusBarAppearance.bind(this)}
        ref='menu'
        style={appStyle.container}>

        <Navigator
          configureScene={this.configureScene.bind(this)}
          initialRoute={this.getRoute('home')}
          ref='navigator'
          renderScene={this.renderScene.bind(this)}
          style={appStyle.container}
        />

      </SideMenu>
    );

  }

}

export default App;
