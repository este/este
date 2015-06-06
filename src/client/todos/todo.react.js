import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
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
          disabled={actions.saveTitle.pending}
          id={todo.id}
          isRequired
          maxLength={actions.MAX_TODO_TITLE_LENGTH}
          name="title"
          onSave={(title, hide) => actions.saveTitle(todo.id, title).then(hide)}
          onState={actions.onEditableState}
          pendingActions={this.props.pendingActions}
          state={this.props.editable}
        >
          <label>{todo.title}</label>
        </Editable>
        <span
          /*
            Note pattern, like input has value prop, element have children prop.
            Use it only for primitive values like string or number.
          */
          children="x"
          className="button"
          onClick={() => actions.deleteTodo(todo)}
        />
      </li>
    );
  }

}

Todo.propTypes = {
  editable: React.PropTypes.instanceOf(immutable.Map),
  pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
  todo: React.PropTypes.instanceOf(immutable.Record)
};

export default Todo;
