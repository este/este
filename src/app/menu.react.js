import Component from '../components/component.react';
import React from 'react-native';
import {ScrollView, Text} from 'react-native';

import styles from './menu.style';

class Menu extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onItemSelected: React.PropTypes.func.isRequired
  }

  render() {
    const pages = ['home', 'todos'];
    const {msg, onItemSelected} = this.props;

    return (
      <ScrollView style={styles.menu}>
        {pages.map(page => (
          <Text key={page} onPress={_ => onItemSelected(page)} style={styles.item}>
            {msg[page]}
          </Text>
        ))}
      </ScrollView>
    );
  }

}

Menu.propTypes = {

};

export default Menu;
