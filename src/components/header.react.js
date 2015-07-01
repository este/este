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
      this.props.navigation.toggleMenu();
    else
      this.props.navigation.pop();
  }

  render() {
    const {title, hideBackButton, navigation} = this.props;
    const isMainView = navigation.getCurrentRoutes().length === 1;

    const backButton = isMainView ?
      <Image source={require('image!menu-icon')} style={style.menuIcon} /> :
      <Text style={style.menuLink}>{msg('buttons.back')}</Text>;

    return (
      <View style={style.container}>

        {!hideBackButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={_ => this.handleBackButtonClick(isMainView)}>
              {backButton}
          </TouchableOpacity>
        )}

        <Text style={style.header}>{title} {isMainView}</Text>
      </View>
    );
  }

}

Header.propTypes = {
  hideBackButton: React.PropTypes.bool,
  navigation: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired
};

export default Header;
