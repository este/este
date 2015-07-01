import React from 'react-native';
import Component from '../components/component.react';
import {msg} from '../intl/store';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import style from './header.style';

class Header extends Component {

  handleBackButtonClick(isMainView) {
    if (isMainView)
      this.props.menuAction();
    else
      this.props.navigator.pop();
  }

  getCurrentRoute(navigator) {
    const routes = navigator.getCurrentRoutes();
    return routes[routes.length - 1];
  }

  render() {
    const {navigator} = this.props;
    const isMainView = navigator.getCurrentRoutes().length === 1;
    const route = this.getCurrentRoute(navigator);

    const backButton = isMainView ?
      <Image source={require('image!menu-icon')} style={style.menuIcon} /> :
      <Text style={style.menuLink}>{msg('buttons.back')}</Text>;

    const navbarStyle = [style.container];
    if (route.hideNavbar)
      navbarStyle.push(style.containerHidden);

    return (
      <View style={navbarStyle}>

        {!route.hideBackButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={_ => this.handleBackButtonClick(isMainView)}>
              {backButton}
          </TouchableOpacity>
        )}

        <Text style={style.header}>{route.title}</Text>
      </View>
    );
  }

}

Header.propTypes = {
  menuAction: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
};

export default Header;
