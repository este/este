import PureComponent from '../components/purecomponent.react';
import React from 'react';
import Todo from './todo.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

class List extends PureComponent {

  render() {
    const todos = this.props.todos;

    if (!todos.size)
      return (
        <p>{msg('todos.emptyList')}</p>
      );

    return (
      <ol>
        {todos.map((todo, i) =>
          <Todo key={todo.id} todo={todo} />
        )}
      </ol>
    );
  }

}

List.propTypes = {
  todos: React.PropTypes.instanceOf(immutable.List)
};

export default List;
