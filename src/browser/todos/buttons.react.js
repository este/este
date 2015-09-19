import './buttons.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class TodoButtons extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    clearAllEnabled: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired
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
