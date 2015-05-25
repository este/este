import Component from '../components/component.react';
import React from 'react';

class HistoryButtons extends Component {
  render() {
    const state = this.props.state;
    /* 
    Render warning is caused by undo button. 
    I expected it is caused by changing state after server rendering    
    */
    return (
      <div className="buttons">        
        <button
          disabled={!this.props.canUndo}
          onClick={() => state.undo()}
        >Undo</button>
        <button
          disabled={!this.props.canRedo}
          onClick={() => state.redo()}
        >Redo</button>        
      </div>
    );
  }
}

HistoryButtons.propTypes = {
  state: React.PropTypes.object.isRequired,
  canUndo: React.PropTypes.bool.isRequired,
  canRedo: React.PropTypes.bool.isRequired  
};

export default HistoryButtons;
