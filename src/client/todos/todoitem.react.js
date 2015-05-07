import PureComponent from '../components/purecomponent.react';
import React from 'react';
import classnames from 'classnames';
import immutable from 'immutable';
import {deleteTodo, onTodoFieldChange} from './actions';

export default class TodoItem extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  startEditing() {
    this.setState({
      isEditing: true
    });
  }

  stopEditing(e) {
    if (e.key === 'Enter')
      this.setState({
        isEditing: false
      });
  }

  render() {
    const todo = this.props.todo;

    return (
      <li className={classnames({editing: false})}>
        {!this.state.isEditing && <label onClick={() => this.startEditing()}>{todo.title}</label>}
        {this.state.isEditing &&
          <input
            type="text"
            name="title"
            onChange={(e) => onTodoFieldChange(todo, e)}
            onKeyDown={(e) => this.stopEditing(e)}
            value={todo.title} />
        }
        <button onClick={() => deleteTodo(todo)}>x</button>
      </li>
    );
  }

}

TodoItem.propTypes = {
  todo: React.PropTypes.instanceOf(immutable.Record)
};
