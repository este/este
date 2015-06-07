import './todobuttons.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';

class TodoButtons extends Component {

  render() {
    return (
      <div className="todo-item-buttons">
        <span
          className="button"
          onClick={() => actions.deleteTodo(this.props.todo)}
        >x</span>
      </div>
    );
  }

}

TodoButtons.propTypes = {
  todo: React.PropTypes.instanceOf(immutable.Record)
};

export default TodoButtons;
