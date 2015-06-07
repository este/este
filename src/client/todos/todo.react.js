import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
import TodoButtons from './todobuttons.react';
import immutable from 'immutable';

// Leverage webpack require goodness.
require('./todo.styl');

class Todo extends Component {

  render() {
    const todo = this.props.todo;

    return (
      <li className="todo-item">
        <Editable
          defaultValue={todo.title}
          disabled={this.props.pendingSaveTitle}
          id={todo.id}
          isRequired
          maxLength={actions.MAX_TODO_TITLE_LENGTH}
          name="title"
          onSave={(title, hide) => actions.saveTitle(todo.id, title).then(hide)}
          onState={actions.onEditableState}
          state={this.props.editable}
        >
          <label>{todo.title}</label>
        </Editable>
        <TodoButtons todo={todo} />
      </li>
    );
  }

}

Todo.propTypes = {
  editable: React.PropTypes.instanceOf(immutable.Map),
  pendingSaveTitle: React.PropTypes.bool.isRequired,
  todo: React.PropTypes.instanceOf(immutable.Record)
};

export default Todo;
