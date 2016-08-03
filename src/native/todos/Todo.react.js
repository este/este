import React, { Component, PropTypes } from 'react';
import theme from '../app/theme';
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

export default class Todo extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onCheckboxPress = this.onCheckboxPress.bind(this);
  }

  onCheckboxPress() {
    const { todo, toggleTodoCompleted } = this.props;
    toggleTodoCompleted(todo);
  }

  render() {
    const { todo } = this.props;
    return (
      <View style={styles.todo}>
        <Checkbox
          checked={todo.completed}
          onPress={this.onCheckboxPress}
          style={styles.checkbox}
        />
        <TextInput
          editable={false}
          viewStyle={styles.textInputView}
          value={todo.title}
        />
      </View>
    );
  }

}
