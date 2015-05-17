import PureComponent from '../components/purecomponent.react';
import React from 'react';
import classnames from 'classnames';
import immutable from 'immutable';
import {deleteTodo} from './actions';

class Todo extends PureComponent {

  render() {
    const todo = this.props.todo;

    return (
      <li className={classnames({editing: false})}>
        <label>{todo.title}</label>
        <span className="button" onClick={() => deleteTodo(todo)}>x</span>
      </li>
    );
  }

}

Todo.propTypes = {
  todo: React.PropTypes.instanceOf(immutable.Record)
};

export default Todo;
