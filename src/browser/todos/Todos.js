/* @flow */
import React from 'react';
import Todo from './Todo';
import todosMessages from '../../common/todos/todosMessages';
import { Block, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';

const Todos = ({ deleteTodo, todos, toggleTodoCompleted }) => {
  if (!todos.size) {
    return (
      <Block>
        <FormattedMessage {...todosMessages.empty} />
      </Block>
    );
  }

  const list = todos
    .toList()
    .sortBy(item => item.createdAt)
    .reverse();

  return (
    <View>
      {list.map(todo =>
        <Block key={todo.id}>
          <Todo
            deleteTodo={deleteTodo}
            todo={todo}
            toggleTodoCompleted={toggleTodoCompleted}
          />
        </Block>
      )}
    </View>
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
