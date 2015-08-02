import './buttons.styl';
import Component from '../components/component.react';
import React from 'react';

export default class TodoButtons extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    clearAllEnabled: React.PropTypes.bool.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {actions, clearAllEnabled, msg} = this.props;

    return (
      <div className="buttons">
        <button
          children={msg.clearAll}
          disabled={!clearAllEnabled}
          onClick={actions.clearAll}
        />
        <button
          children={msg.add100}
          onClick={actions.addHundredTodos}
        />
      </div>
    );
  }

}
