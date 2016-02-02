import './Buttons.scss';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Buttons extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    clearAllEnabled: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired
  };

  render() {
    const {actions, clearAllEnabled, msg} = this.props;

    return (
      <div className="buttons">
        <button
          disabled={!clearAllEnabled}
          onClick={actions.clearAllTodos}
        >{msg.clearAll}</button>
        <button
          onClick={actions.addHundredTodos}
        >{msg.add100}</button>
      </div>
    );
  }

}
