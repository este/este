/* @flow */
import React from 'react';
import Todo from './Todo';
import todosMessages from '../../common/todos/todosMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';

const Todos = ({ deleteTodo, todos, toggleTodoCompleted }) => {
  if (!todos.size) {
    return (
      <p><FormattedMessage {...todosMessages.empty} /></p>
    );
  }

  const list = todos.toList().sortBy(item => item.createdAt).reverse();

  return (
    <ol className="todos">
      {list.map(todo =>
        <Todo
          deleteTodo={deleteTodo}
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
          key={todo.id}
        />
      )}
    </ol>
  );
};

Todos.propTypes = {
  deleteTodo: React.PropTypes.func.isRequired,
  todos: React.PropTypes.object.isRequired,
  toggleTodoCompleted: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  todos: state.todos.map,
}), { deleteTodo, toggleTodoCompleted })(Todos);
