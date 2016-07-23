import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../app/theme';
import { Checkbox } from '../app/components';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  todo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    color: theme.textColor,
    flex: 1,
    fontSize: theme.fontSizeBase,
    paddingRight: theme.fontSizeH5,
  },
  checkbox: {
    height: theme.fontSizeH5,
    marginLeft: theme.fontSizeH5,
    marginRight: theme.fontSizeH5,
    width: theme.fontSizeH5,
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
          style={styles.input}
          value={todo.title}
        />
      </View>
    );
  }

}
