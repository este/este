import Component from '../components/component.react';
import React from 'react-native';
import {msg} from '../intl/store';
import {ScrollView, Text} from 'react-native';

import styles from './menu.style';

class Menu extends Component {

  onItemSelected(item) {
    this.props.menuActions.close();
    this.props.onItemSelected(item);
  }

  render() {
    const pages = ['home', 'todos'];

    return (
      <ScrollView style={styles.menu}>
        {pages.map(page => (
          <Text key={page} onPress={_ => this.onItemSelected(page)} style={styles.item}>
            {msg(`menu.${page}`)}
          </Text>
        ))}
      </ScrollView>
    );
  }

}

Menu.propTypes = {
  menuActions: React.PropTypes.object,
  onItemSelected: React.PropTypes.func.isRequired
};

export default Menu;
