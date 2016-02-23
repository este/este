import './Todo.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames';

// Presentational component.
export default class Todo extends Component {

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
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
          className={cx('view', { completed: todo.completed })}
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
