import './Todo.scss';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

// Presentational component.
export default class Todo extends Component {

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const {deleteTodo, todo} = this.props;
    deleteTodo(todo.id);
  }

  render() {
    const {todo} = this.props;

    return (
      <li className="todo">
        <span className="view">{todo.title}</span>
        <span
          className="button"
          onClick={this.onButtonClick}
        >x</span>
      </li>
    );
  }

}
