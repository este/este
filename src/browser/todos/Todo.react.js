import './Todo.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

// Presentational component.
export default class Todo extends Component {

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
  }

  onButtonClick() {
    const { deleteTodo, todo } = this.props;
    deleteTodo(todo.id);
  }

  onTitleClick() {
    const { todo, toggleTodoCompleted } = this.props;
    toggleTodoCompleted(todo);
  }

  render() {
    const { todo } = this.props;

    return (
      <li className="todo">
        <span
          className={classnames('view', { completed: todo.completed })}
          onClick={this.onTitleClick}
        >{todo.title}</span>
        <span
          className="button"
          onClick={this.onButtonClick}
        >x</span>
      </li>
    );
  }

}
