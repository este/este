import React, {StatusBarIOS, View, Navigator} from 'react-native';
import PureComponent from '../components/component.react';
import {autobind} from 'core-decorators';
import connect from '../lib/connect';

// Components
import Menu from './menu.react';
import SideMenu from '../components/menu.react';
import {routes, defaultRoute} from '../routes';

// Styles
import appStyle from './app.style';

// Actions
import {toggleStatusBar, toggleMenu} from './actions';
import {selectLanguage} from '../intl/actions';

// Selectors
import {selectSettings} from './selectors';
import {selectTranslations} from '../intl/selectors';

@connect(selectSettings, selectTranslations)
export default class App extends PureComponent {

  static propTypes = {
    availableLanguages: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    isMenuOpened: React.PropTypes.bool,
    isStatusBarHidden: React.PropTypes.bool,
    msg: React.PropTypes.object.isRequired,
    statusBarStyle: React.PropTypes.string
  }

  componentWillMount() {
    StatusBarIOS.setHidden(this.props.isStatusBarHidden, true);
    StatusBarIOS.setStyle(this.props.statusBarStyle, false);
  }

  componentDidUpdate(prevProps) {
    StatusBarIOS.setHidden(this.props.isStatusBarHidden, true);
    StatusBarIOS.setStyle(this.props.statusBarStyle, false);
  }

  // Add more checks here when having user validation
  // to show e.g login page
  getInitialRoute() {
    return routes[defaultRoute];
  }

  onButtonPressed() {
    this.refs.menu.toggleMenu();
  }

  @autobind
  onItemSelected(itemKey) {
    const route = routes[itemKey];

    if (route) {
      this.refs.navigator.replace(route);
      this.props.dispatch(toggleMenu());
    }
  }

  @autobind
  configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  @autobind
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
      <View style={[appStyle.sceneView, route.style]}>
        <Handler navigation={navigation} {...props} />
      </View>
    );
  }

  render() {
    const {
      availableLanguages,
      dispatch,
      msg: {menu: msg},
      isMenuOpened
    } = this.props;

    const menu = (
      <Menu
        availableLanguages={availableLanguages}
        msg={msg}
        onItemSelected={this.onItemSelected}
        onLanguageSelected={lang => dispatch(selectLanguage(lang))}
      />
    );

    return (
      <SideMenu
        animation='spring'
        disableGestures
        isOpen={isMenuOpened}
        menu={menu}
        onChange={_ => dispatch(toggleStatusBar())}
        ref='menu'
        style={appStyle.container}
        touchToClose>

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
