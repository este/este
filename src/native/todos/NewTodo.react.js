import Component from '../components/Component.react';
import React from 'react-native';

const {
  PropTypes, StyleSheet, TextInput, View
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#31AACC',
    borderTopColor: '#73CEE7',
    borderTopWidth: 1,
    height: 62
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  }
});


export default class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  };

  render() {
    const {actions, msg, todo} = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => actions.onNewTodoChange('title', text)}
          onEndEditing={() => actions.addTodo(todo)}
          placeholder={msg.newTodoPlaceholder}
          placeholderTextColor={'#cce9f2'}
          style={styles.input}
          value={todo.title}
        />
      </View>
    );
  }

}
