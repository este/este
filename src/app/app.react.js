import React, {Settings, StatusBarIOS, View, Navigator} from 'react-native';
import Component from '../components/component.react';
import Menu from './menu.react';
import {routes, defaultRoute} from '../routes';
import SideMenu from '../components/menu.react';
import ContentView from '../components/contentView.react';

import appStyle from './app.style';

// flux
import flux from '../lib/flux/decorate';
import store from './store';
import setToString from '../lib/settostring';

import * as appActions from './actions';
import * as todoActions from '../todos/actions';

const registerActions = [
  todoActions,
  appActions
];

@flux(store)
class App extends Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    flux: React.PropTypes.object.isRequired,
    intl: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentWillMount() {
    this.createActions();

    StatusBarIOS.setHidden(this.props.app.isStatusBarHidden, true);
    StatusBarIOS.setStyle(this.props.app.statusBarStyle, false);
  }

  componentDidUpdate(prevProps) {
    // Add checks for user authentication here and redirect using this.refs...
    // when it's neccessary
    Settings.set({
      state: {
        todos: this.props.todos.toJS()
      }
    });

    StatusBarIOS.setHidden(this.props.app.isStatusBarHidden, true);
    StatusBarIOS.setStyle(this.props.app.statusBarStyle, false);
  }

  createActions() {
    const {flux} = this.props;

    this.actions = registerActions.reduce((registerActions, {feature, actions, create, deps = []}) => {
      const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
      const featureActions = create(dispatch, ...deps);
      setToString(feature, actions);
      return {...registerActions, [feature]: featureActions};
    }, {});
  }

  getInitialRoute() {
    // Add more checks here when having user validation
    // to show e.g login page
    return routes[defaultRoute];
  }

  onButtonPressed() {
    this.refs.menu.toggleMenu();
  }

  onItemSelected(itemKey) {
    const route = routes[itemKey];

    if (route) {
      this.refs.navigator.replace(route);
      this.actions.app.toggleMenu();
    }
  }

  configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    const Handler = route.component;
    const context = navigator.navigationContext;

    // Custom navigation to speed your things a little bit
    // Feel free to add your own methods
    const navigation = {
      pop: navigator.pop,
      popToTop: navigator.popToTop,
      popBack: (index) => {
        const routes = navigator.getCurrentRoutes();
        navigator.popToRoute(routes[routes.length - index - 1]);
      },
      replaceAtIndex: navigator.replaceAtIndex,
      replace: navigator.replace,
      transitionTo: (route, passProps = {}) => navigator.push({...this.getRoute(route), passProps}),
      getRoute: (route) => routes[route],
      menu: this.refs.menu,
      addListener: context.addListener.bind(context)
    };

    const props = {
      ...this.props,
      ...route.passProps,
      actions: this.actions
    };

    return (
      <ContentView
        isDisabled={this.props.app.isMenuOpened}
        onDisabledTap={this.actions.app.toggleMenu}>
        <View style={[appStyle.sceneView, route.style]}>
          <Handler navigation={navigation} {...props} />
        </View>
      </ContentView>
    );
  }

  render() {
    const {app: {toggleStatusBar}} = this.actions;
    const {
      msg: {menu: msg},
      app: {isMenuOpened}
    } = this.props;

    return (
      <SideMenu
        animation='spring'
        disableGestures={true}
        isOpen={isMenuOpened}
        menu={<Menu msg={msg} onItemSelected={this.onItemSelected}/>}
        onChange={toggleStatusBar}
        ref='menu'
        style={appStyle.container}>

        <Navigator
          configureScene={this.configureScene}
          initialRoute={this.getInitialRoute()}
          ref='navigator'
          renderScene={this.renderScene}
          style={appStyle.container}
        />

      </SideMenu>
    );

  }

}

export default App;
