import './todo.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
import TodoButtons from './todobuttons.react';
import immutable from 'immutable';

class Todo extends Component {

  render() {
    const {todo, pendingSaveTitle, editable} = this.props;

    return (
      <li className="todo-item">
        <Editable
          defaultValue={todo.title}
          disabled={pendingSaveTitle}
          id={todo.id}
          isRequired
          maxLength={actions.MAX_TODO_TITLE_LENGTH}
          name="title"
          onSave={(title, hide) => actions.saveTitle(todo.id, title).then(hide)}
          onState={actions.onEditableState}
          state={editable}
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
