import Component from '../components/Component.react';
import React from 'react-native';
import {format} from '../../common/intl/format';

const {
  PropTypes, StyleSheet, Text, View
} = React;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#31AACC',
    justifyContent: 'center',
    marginTop: -5,
    paddingBottom: 20,
    paddingTop: 10
  },
  header: {
    color: '#fff',
    fontSize: 20,
  }
});

export default class Header extends Component {

  static propTypes = {
    map: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  }

  render() {
    const {map, msg} = this.props;
    const leftTodos = map.filter(todo => !todo.completed).size;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {(format(msg.leftList, {size: leftTodos}))}
        </Text>
      </View>
    );
  }

}
