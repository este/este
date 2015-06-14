import './todo.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import Editable from '../components/editable.react';
import React from 'react';
import immutable from 'immutable';

class Todo extends Component {

  render() {
    const {disabled, editable, todo} = this.props;

    const editableFor = (propName) =>
      <Editable
        disabled={disabled}
        id={todo.id}
        name={propName}
        onSave={actions.onEditableSave}
        onState={actions.onEditableState}
        state={editable ? editable.get(propName) : null}
        text={todo[propName]}
      />;

    return (
      <li className="todo-item">
        {editableFor('title')}
        <span
          children="x"
          className="button"
          onClick={() => actions.deleteTodo(todo)}
        />
      </li>
    );
  }

}

Todo.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  editable: React.PropTypes.instanceOf(immutable.Map),
  todo: React.PropTypes.instanceOf(immutable.Record).isRequired
};

export default Todo;
