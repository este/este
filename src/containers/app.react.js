import React, {StatusBarIOS, View, Navigator} from 'react-native';
import PureComponent from '../components/component.react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux/native';

// Components
import Menu from '../app/menu.react';
import SideMenu from '../components/menu.react';
import routes from '../routes';

// Styles
import appStyle from '../app/app.style';

// Actions
import {toggleStatusBar, toggleMenu} from '../app/actions';
import {selectLanguage} from '../intl/actions';

// Selectors
import {selectTranslations} from '../intl/selectors';

@connect(state => ({
  ...state,
  msg: selectTranslations(state)
}))
export default class App extends PureComponent {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    intl: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    settings: React.PropTypes.shape({
      isMenuOpened: React.PropTypes.bool,
      isStatusBarHidden: React.PropTypes.bool,
      statusBarStyle: React.PropTypes.string
    }).isRequired
  }

  componentWillMount() {
    const {settings} = this.props;
    StatusBarIOS.setHidden(settings.isStatusBarHidden, true);
    StatusBarIOS.setStyle(settings.statusBarStyle, false);
  }

  componentDidUpdate(prevProps) {
    const {settings} = this.props;
    StatusBarIOS.setHidden(settings.isStatusBarHidden, true);
    StatusBarIOS.setStyle(settings.statusBarStyle, false);
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
      ...route.passProps
    };

    return (
      <View style={[appStyle.sceneView, route.style]}>
        <Handler navigation={navigation} {...props} />
      </View>
    );
  }

  render() {
    const {
      intl: {availableLanguages},
      msg,
      dispatch,
      settings
    } = this.props;

    const menu = (
      <Menu
        availableLanguages={availableLanguages}
        msg={msg.menu}
        onItemSelected={this.onItemSelected}
        onLanguageSelected={lang => dispatch(selectLanguage(lang))}
      />
    );

    return (
      <SideMenu
        animation='spring'
        disableGestures
        isOpen={settings.isMenuOpened}
        menu={menu}
        onChange={_ => dispatch(toggleStatusBar())}
        ref='menu'
        style={appStyle.container}
        touchToClose>

        <Navigator
          configureScene={this.configureScene}
          initialRoute={routes.home}
          ref='navigator'
          renderScene={this.renderScene}
          style={appStyle.container}
        />

      </SideMenu>
    );

  }

}
