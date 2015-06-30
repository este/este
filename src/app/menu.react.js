import Component from '../components/component.react';
import React from 'react-native';
import {logout} from '../auth/actions';
import {
  ScrollView,
  Text
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
    return (
      <ScrollView style={styles.menu}>
        <Text onPress={_ => this.onItemSelected('champagnes')} style={styles.item}>CHAMPAGNE</Text>
        <Text onPress={_ => this.onItemSelected('orders')} style={styles.item}>ORDERS</Text>
        <Text onPress={_ => this.logoutUser()} style={styles.item}>LOGOUT</Text>
      </ScrollView>
    );
  }

}

Menu.propTypes = {
  menuActions: React.PropTypes.object,
  onItemSelected: React.PropTypes.func.isRequired
};

export default Menu;
