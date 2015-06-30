import Component from '../components/component.react';
import React from 'react-native';
import {msg} from '../intl/store';
import {logout} from '../auth/actions';
import {
  ScrollView,
  Text,
  View
} from 'react-native';

import styles from './menu.style';

class Menu extends Component {

  onItemSelected(item) {
    this.props.menuActions.close();
    this.props.onItemSelected(item);
  }

  logoutUser() {
    this.props.menuActions.close();
    logout();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <ScrollView style={styles.menu}>
        <Text onPress={_ => this.onItemSelected('home')} style={styles.item}>
          {msg('menu.home')}
        </Text>
        <Text onPress={_ => this.onItemSelected('todos')} style={styles.item}>
          {msg('menu.todos')}
        </Text>

        {isLoggedIn && (
          <View>
            <Text onPress={_ => this.onItemSelected('me')} style={styles.item}>
              {msg('menu.me')}
            </Text>
            <Text onPress={_ => this.logoutUser()} style={styles.item}>
              {msg('menu.logout')}
            </Text>
          </View>
        )}

        {!isLoggedIn && (
          <Text onPress={_ => this.onItemSelected('login')} style={styles.item}>
            {msg('menu.login')}
          </Text>
        )}
      </ScrollView>
    );
  }

}

Menu.propTypes = {
  isLoggedIn: React.PropTypes.object.isRequired,
  menuActions: React.PropTypes.object,
  onItemSelected: React.PropTypes.func.isRequired
};

export default Menu;
