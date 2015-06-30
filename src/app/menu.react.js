import Component from '../components/component.react';
import React from 'react-native';
import {msg} from '../intl/store';
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

  render() {
    return (
      <ScrollView style={styles.menu}>
        <Text onPress={_ => this.onItemSelected('todos')} style={styles.item}>
          {msg('menu.todos')}
        </Text>
      </ScrollView>
    );
  }

}

Menu.propTypes = {
  menuActions: React.PropTypes.object,
  onItemSelected: React.PropTypes.func.isRequired
};

export default Menu;
