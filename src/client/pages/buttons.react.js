import * as actions from '../todos/actions';
import Component from '../components/component.react';
import React from 'react';

//import * as appState from '../state';
import {state} from '../state';

import {FormattedMessage} from 'react-intl';
import {msg} from '../intl/store';

class TodoButtons  {

  undo() {
    console.log(!state.canUndo);
    if (state.canUndo) state.undo();
  }

  redo(){
    console.log(!state.canRedo);
    if (state.canRedo) state.redo();
  }

  render() {
    return (
      <div className="buttons">
        <button
          children={msg('todos.clearAll')}
          disabled={!this.props.clearAllEnabled}
          onClick={actions.clearAll}
        />
        <button
          children={msg('todos.add100')}
          onClick={actions.addHundredTodos}
        />
        {/* disabled don't work */}        
        <button
          disabled={!state.canUndo}
          onClick={() => this.undo()}
        >Undo</button>
        <button
          disabled={!state.canRedo}
          onClick={() => this.redo()}
        >Redo</button>        
        
      </div>
    );
  }
}

TodoButtons.propTypes = {
  clearAllEnabled: React.PropTypes.bool.isRequired
};

export default TodoButtons;
