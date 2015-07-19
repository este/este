import './todo.styl';
import Component from '../components/component.react';
// import Editable from '../components/editable.react';
import React from 'react';

export default class Todo extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    todo: React.PropTypes.object.isRequired
  };

  render() {
    const {actions, todo} = this.props;

    return (
      <li className="todo">
        <span className="editable view">{todo.title}</span>
        <span className="button" onClick={() => actions.deleteTodo(todo)}>x</span>
      </li>
    );

    // Editable jako komponenta jo, ale state patri do modelu primo, tak.
    // const editableFor = (propName) =>
    //   <Editable
    //     disabled={disabled}
    //     id={todo.id}
    //     name={propName}
    //     onSave={actions.onEditableSave}
    //     onState={actions.onEditableState}
    //     state={editable ? editable.get(propName) : null}
    //     text={todo[propName]}
    //   />;

    // return (
    //   <li className="todo">
    //     {editableFor('title')}
    //     <span className="button" onClick={() => actions.deleteTodo(todo)}>x</span>
    //   </li>
    // );
  }

}
