import Component from 'react-pure-render/component';
import React from 'react-native';

// yahoo/react-intl still does not support React Native, but we can use format.
// https://github.com/yahoo/react-intl/issues/119
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
  };

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
