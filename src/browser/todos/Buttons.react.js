import './Buttons.scss';
import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Buttons extends Component {

  static propTypes = {
    addHundredTodos: PropTypes.func.isRequired,
    clearAllTodos: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const {addHundredTodos, clearAllTodos, msg, todos} = this.props;

    return (
      <div className="buttons">
        <button
          disabled={todos.size === 0}
          onClick={clearAllTodos}
        >{msg.clearAll}</button>
        <button
          onClick={addHundredTodos}
        >{msg.add100}</button>
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.todos,
  todos: state.todos.map
}), todosActions)(Buttons);
