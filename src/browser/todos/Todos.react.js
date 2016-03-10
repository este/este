import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Todo from './Todo.react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  empty: {
    defaultMessage: 'It\'s rather empty here...',
    id: 'todos.empty'
  }
});

// Container component.
class Todos extends Component {

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired
  };

  // Example how to measure component update.
  // componentWillUpdate() {
  //   this.start = Date.now();
  // }

  // componentDidUpdate() {
  //   const total = Date.now() - this.start;
  //   console.log(`[ESTE] Todos updated in ${total}ms`);
  // }

  render() {
    const { deleteTodo, todos, toggleTodoCompleted } = this.props;

    if (!todos.size) {
      return <p><FormattedMessage {...messages.empty} /></p>;
    }

    // Big lists should be sorted in reducer.
    const list = todos.toList().sortBy(item => item.createdAt);

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
  }

}

export default connect(state => ({
  todos: state.todos.map
}), todosActions)(Todos);
