import './Buttons.scss';
import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  add100: {
    defaultMessage: 'Add 100 Todos',
    id: 'todos.buttons.add100'
  },
  clearAll: {
    defaultMessage: 'Clear All',
    id: 'todos.buttons.clearAll'
  }
});

class Buttons extends Component {

  static propTypes = {
    addHundredTodos: PropTypes.func.isRequired,
    clearAllTodos: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const { addHundredTodos, clearAllTodos, todos } = this.props;

    return (
      <div className="buttons">
        <button
          disabled={todos.size === 0}
          onClick={clearAllTodos}
        ><FormattedMessage {...messages.clearAll} /></button>
        <button
          onClick={addHundredTodos}
        ><FormattedMessage {...messages.add100} /></button>
      </div>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map
}), todosActions)(Buttons);
