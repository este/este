import './editable.styl';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl/store';

const State = immutable.Record({
  isEditing: false,
  value: ''
});

const initialState = new State;

class Editable extends Component {

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  onInputChange(e) {
    this.setState(state => state.set('value', e.target.value));
  }

  onInputFocus(e) {
    this.moveCaretToEnd(e.target);
  }

  moveCaretToEnd(field) {
    const length = field.value.length;
    field.selectionStart = length;
    field.selectionEnd = length;
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

  saveEdit() {
    if (!this.isDirty()) {
      this.disableEdit();
      return;
    }

    const value = this.props.state.value.trim();
    if (!value && this.props.isRequired)
      return;

    this.props
      .onSave(this.props.id, this.props.name, value)
      .then(() => {
        this.disableEdit();
      });
  }

  isDirty() {
    return this.props.state.value !== this.props.text;
  }

  onKeyEscape() {
    this.cancelEdit();
  }

  cancelEdit() {
    if (this.isDirty())
      if (!confirm(msg('confirmations.cancelEdit'))) // eslint-disable-line no-alert
        return;
    this.disableEdit();
  }

  disableEdit() {
    this.setState(state => null);
  }

  onViewClick(e) {
    this.enableEdit();
  }

  enableEdit() {
    this.setState(state => state.merge({
      isEditing: true,
      value: this.props.text
    }));
  }

  setState(callback) {
    this.props.onState(
      this.props.id,
      this.props.name,
      callback(this.props.state || initialState)
    );
  }

  render() {
    const {state, text, disabled} = this.props;
    const isEditing = state && state.isEditing;

    if (!isEditing) return (
      <span className="editable view" onClick={this.onViewClick}>{text}</span>
    );

    return (
      <input
        autoFocus
        className="editable edit"
        disabled={disabled}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        onKeyDown={this.onInputKeyDown}
        value={state.value}
      />
    );
  }

}

Editable.propTypes = {
  disabled: React.PropTypes.bool,
  id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
  isRequired: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onState: React.PropTypes.func.isRequired,
  state: React.PropTypes.instanceOf(State),
  text: React.PropTypes.string.isRequired
};

Editable.defaultProps = {
  isRequired: true
};

export default Editable;
