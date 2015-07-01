import * as actions from './actions';
import Component from '../components/component.react';
import Input from '../components/input.react';
import React from 'react';
import TodoRecord from './todo';
import {
  View
} from 'react-native';

import style from './todo.style.js';

class Todo extends Component {

  render() {
    const {todo, disabled} = this.props;

    const editableFor = (propName) =>
      <Input
        editable={!disabled}
        enablesReturnKeyAutomatically={true}
        name={propName}
        onChange={e => actions.onTodoFieldChange(todo.id, e)}
        style={style.input}
        value={todo[propName]}
      />;

    return (
      <View>
        {editableFor('title')}
      </View>
    );
  }

}

Todo.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  todo: React.PropTypes.instanceOf(TodoRecord).isRequired
};

export default Todo;
