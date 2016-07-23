import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Todo from './Todo.react';
import todosMessages from '../../common/todos/todosMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';

// Container component.
export class Todos extends Component {

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired,
  };

  // // Check render performance.
  // componentWillUpdate() {
  //   this.start = Date.now();
  // }
  // componentDidUpdate() {
  //   console.log(`[ESTE] Todos updated in ${Date.now() - this.start}ms`);
  // }

  render() {
    const { deleteTodo, todos, toggleTodoCompleted } = this.props;

    if (!todos.size) {
      return <p><FormattedMessage {...todosMessages.empty} /></p>;
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
  }

}

export default connect(state => ({
  todos: state.todos.map,
}), { deleteTodo, toggleTodoCompleted })(Todos);
