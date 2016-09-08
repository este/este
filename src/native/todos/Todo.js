/* @flow weak */
import React from 'react';
import theme from '../app/themes/initial';
import { Checkbox, TextInput } from '../app/components';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  todo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    height: theme.fontSizeH5,
    marginLeft: theme.fontSizeH5,
    marginRight: theme.fontSizeH5,
    width: theme.fontSizeH5,
  },
  textInputView: {
    alignSelf: 'center',
    borderBottomWidth: 0,
    flex: 1,
    marginBottom: 0,
  },
});

const Todo = ({ todo, toggleTodoCompleted }) => (
  <View style={styles.todo}>
    <Checkbox
      checked={todo.completed}
      onPress={() => toggleTodoCompleted(todo)}
      style={styles.checkbox}
    />
    <TextInput
      editable={false}
      viewStyle={styles.textInputView}
      value={todo.title}
    />
  </View>
);

Todo.propTypes = {
  todo: React.PropTypes.object.isRequired,
  toggleTodoCompleted: React.PropTypes.func.isRequired,
};

export default Todo;
