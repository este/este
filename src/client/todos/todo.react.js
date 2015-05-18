import * as actions from './actions';
import Editable from '../components/editable.react';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';

class Todo extends PureComponent {

  render() {
    const todo = this.props.todo;

    return (
      <li className="todo-item">
        <Editable
          defaultValue={todo.title}
          disabled={actions.saveTitle.pending}
          id={todo.id}
          maxLength={actions.MAX_TODO_TITLE_LENGTH}
          name="title"
          onSave={(title, hide) => {
            actions.saveTitle(todo.id, title).then(hide);
          }}
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
