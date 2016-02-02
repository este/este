import './Todo.scss';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Todo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const {actions, todo} = this.props;
    actions.deleteTodo(todo.id);
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
