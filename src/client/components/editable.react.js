import PureComponent from '../components/purecomponent.react';
import React from 'react';
import classnames from 'classnames';
import immutable from 'immutable';

require('./editable.styl');

/*
  This is super useful component for inline editation. Reactive app must be able
  to allow editation any piece of UI, any form field, individually. Granularity
  is key to good user experience. Traditionally, such approach requires a lot of
  boilerplate code, but it's piece of cake with React composition. Note editable
  state is stored in global app state, not in component local state. Component
  local state is workaround for mutable app state, therefore should be avoided.

  TODO:
    - isEditable visual hint, optionally explicit edit button.
    - Optionally save and cancel buttons.
    - Growing textarea for multilines.
    - Cancel confirm warning for dirty value.
*/

const State = immutable.Map({
  isEditing: false,
  value: ''
});

class Editable extends PureComponent {

  // Like setInitialState, but defined in global state and lazily.
  setDefaultState() {
    this.setState(() => State);
  }

  // Override setState to use global state instead of local.
  setState(callback) {
    this.props.onState(
      this.props.id,
      this.props.name,
      callback(this.getState())
    );
  }

  // Use getState because this.state is reserved for React. Returns component
  // local state stored in global app state.
  getState() {
    return this.props.state
      ? this.props.state.get(this.props.name)
      : State;
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
    if (!value && this.props.isRequired)
      return;
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
  isRequired: React.PropTypes.bool,
  maxLength: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onState: React.PropTypes.func.isRequired,
  state: React.PropTypes.instanceOf(immutable.Map)
};

export default Editable;
