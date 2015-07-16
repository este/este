import './buttons.styl';
import * as actions from '../todos/actions';
import Component from '../components/component.react';
import React from 'react';
import {msg} from '../intl/store';

export default class TodoButtons extends Component {

  static propTypes = {
    clearAllEnabled: React.PropTypes.bool.isRequired
  };

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
      </div>
    );
  }

}
