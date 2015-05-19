import * as actions from '../todos/actions';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
// import {FormattedMessage} from 'react-intl';
import {msg} from '../intl/store';

require('./buttons.styl');

class ToCheck extends PureComponent {

  render() {
    return (
      <div>
        <button
          children={msg('todos.clearAll')}
          className="todo-button"
          disabled={!this.props.clearAllEnabled}
          onClick={actions.clearAll}
        />
        <button
          children={msg('todos.add100')}
          className="todo-button"
          onClick={actions.addHundredTodos}
        />
        {/* TODO: Reimplement undo. */}
        {/*<button
          disabled={undoStates.length === 1}
          onClick={() => this.undo()}
        ><FormattedMessage
          message={msg('todos.undo')}
          steps={undoStates.length - 1}
        /></button>*/}
      </div>
    );
  }

}

ToCheck.propTypes = {
  clearAllEnabled: React.PropTypes.bool.isRequired
};

export default ToCheck;
