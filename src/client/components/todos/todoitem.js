import PureComponent from '../../../lib/purecomponent';
import React from 'react';
import classnames from 'classnames';
import immutable from 'immutable';
import {deleteTodo} from '../../todos/actions';

export default class TodoItem extends PureComponent {
  static propTypes = {
    todo: React.PropTypes.instanceOf(immutable.Map)
  }
  
  render() {
    const todo = this.props.todo;

    return (
      <li className={classnames({editing: false})}>
        <label>{todo.get('title')}</label>
        <button onClick={() => deleteTodo(todo)}>x</button>
      </li>
    );
  }

}
