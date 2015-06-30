import {msg} from '../intl/store';
import React from 'react-native';
import {
  View,
  Text
} from 'react-native';

import style from './header.style';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleMenuButton = this.handleMenuButton.bind(this);
  }

  handleMenuButton() {
    this.props.navigation.toggleMenu();
  }

  render() {
    const {title, showMenuButton} = this.props;

    return (
      <View style={style.container}>

        <Text style={style.title}>
          {title}
        </Text>

        {showMenuButton && (
          <Text onPress={this.handleMenuButton} style={style.leftLink}>{msg('menu.link')}</Text>
        )}

      </View>
    );
  }

}

Header.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  showBackButton: React.PropTypes.bool,
  showMenuButton: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired
};

export default Header;
