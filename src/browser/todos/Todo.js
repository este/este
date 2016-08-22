import './Todo.scss';
import React from 'react';
import classnames from 'classnames';

const Todo = ({ deleteTodo, todo, toggleTodoCompleted }) => {
  const onTitleClick = () => toggleTodoCompleted(todo);
  const onButtonClick = () => deleteTodo(todo.id);

  return (
    <li className="todo">
      <span
        className={classnames('view', { completed: todo.completed })}
        onClick={onTitleClick}
      >{todo.title}</span>
      <span
        className="button"
        onClick={onButtonClick}
      >x</span>
    </li>
  );
};

Todo.propTypes = {
  deleteTodo: React.PropTypes.func.isRequired,
  todo: React.PropTypes.object.isRequired,
  toggleTodoCompleted: React.PropTypes.func.isRequired,
};

export default Todo;
