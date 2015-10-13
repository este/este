import Component from '../components/Component.react';
import HeaderStyle from './Header.style';
import React, {Image, PropTypes, Text, View, TouchableOpacity} from 'react-native';

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
  }

  render() {
    const {title, toggleSideMenu} = this.props;

    return (
      <View style={HeaderStyle.container}>
        <TouchableOpacity
          activeOpacity={.8}
          onPress={toggleSideMenu}
          style={HeaderStyle.menuLink}
        >
          <Image
            source={require('image!menu-icon')}
            style={HeaderStyle.menuIcon}
          />
        </TouchableOpacity>
        <Text style={HeaderStyle.header}>{title}</Text>
      </View>
    );
  }

}
