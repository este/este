import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';

class TodoButtons extends Component {

  render() {
    return (
      <span
        className="button"
        onClick={() => actions.deleteTodo(this.props.todo)}
      >x</span>
    );
  }

}

TodoButtons.propTypes = {
  todo: React.PropTypes.instanceOf(immutable.Record)
};

export default TodoButtons;
