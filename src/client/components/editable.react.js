import PureComponent from '../components/purecomponent.react';
import React from 'react';
import classnames from 'classnames';
import immutable from 'immutable';

require('./editable.styl');

/*
  This is super useful component for inline editation. Reactive app must be able
  to allow editation any piece of UI, any form field, individually. Granularity
  is key to good user experience. Traditionally, such approach required a lot of
  boilerplate code, but it's piece of cake with React composition. Note editable
  state is stored in global app state. Remember never use component local state.

  TODO:
    - isEditable visual hint, optionally explicit edit button.
    - Optionally save and cancel buttons.
    - isRequired to empty value check
    - Growing textarea for multilines.
    - Cancel confirm warning for dirty value.
*/

// Globalized local state :-)
const State = immutable.Map({
  isEditing: false,
  value: ''
});

class Editable extends PureComponent {

  // Don't use this.state, who knows how React is dealing with it.
  getState() {
    return this.props.state
      ? this.props.state.get(this.props.name)
      : State;
  }

  // Override React local setState with global setState :-)
  setState(callback) {
    this.props.onState(
      this.props.id,
      this.props.name,
      callback(this.getState())
    );
  }

  setDefaultState() {
    this.setState(() => State);
  }

  enableEdit() {
    this.setState(state => state.merge({
      isEditing: true,
      value: this.props.defaultValue
    }));
  }

  saveEdit() {
    // TODO: Add if (!this.valueHasChanged()) return;
    const value = this.getState().toJS().value.trim();
    this.props.onSave(value, () => {
      this.setDefaultState();
    });
  }

  cancelEdit() {
    this.setDefaultState();
  }

  onInputChange(e) {
    this.setState(state => state.set('value', e.target.value));
  }

  onInputFocus(e) {
    e.target.select();
  }

  onInputKeyDown(e) {
    switch (e.key) {
      case 'Enter': this.onKeyEnter(); break;
      case 'Escape': this.onKeyEscape(); break;
    }
  }

  onKeyEnter() {
    this.saveEdit();
  }

  onKeyEscape() {
    this.cancelEdit();
  }

  onViewClick() {
    this.enableEdit();
  }

  render() {
    const {isEditing, value} = this.getState().toJS();

    const edit = (
      <div className="edit">
        <input
          autoFocus
          disabled={this.props.disabled}
          maxLength={this.props.maxLength}
          onChange={(e) => this.onInputChange(e)}
          onFocus={(e) => this.onInputFocus(e)}
          onKeyDown={(e) => this.onInputKeyDown(e)}
          value={value}
        />
      </div>
    );

    const view = (
      <div
        children={this.props.children}
        className="view"
        onClick={() => this.onViewClick()}
      />
    );

    return (
      <div className={classnames('editable-component', {isEditing: isEditing})}>
        {isEditing ? edit : view}
      </div>
    );

  }

}

Editable.propTypes = {
  children: React.PropTypes.node.isRequired,
  defaultValue: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
  maxLength: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onState: React.PropTypes.func.isRequired,
  state: React.PropTypes.instanceOf(immutable.Map)
};

export default Editable;
