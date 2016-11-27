/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import Todo from './Todo';
import todosMessages from '../../common/todos/todosMessages';
import { Block, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';

const Todos = ({ deleteTodo, todos, toggleTodoCompleted }) => {
  if (R.isEmpty(todos)) {
    return (
      <Block>
        <FormattedMessage {...todosMessages.empty} />
      </Block>
    );
  }

  const sortedTodos = R.compose(
    R.reverse,
    R.sortBy(R.prop('createdAt')),
    R.values, // object values to array
  )(todos);

  return (
    <View>
      {sortedTodos.map(todo =>
        <Block key={todo.id}>
          <Todo
            deleteTodo={deleteTodo}
            todo={todo}
            toggleTodoCompleted={toggleTodoCompleted}
          />
        </Block>,
      )}
    </View>
  );
};

Todos.propTypes = {
  deleteTodo: React.PropTypes.func.isRequired,
  todos: React.PropTypes.object.isRequired,
  toggleTodoCompleted: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { deleteTodo, toggleTodoCompleted },
)(Todos);
