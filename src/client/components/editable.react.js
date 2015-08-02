import './editable.styl';
import Component from '../components/component.react';
import React from 'react';
import Textarea from 'react-textarea-autosize';
import classnames from 'classnames';
import immutable from 'immutable';
import {msg} from '../intl/store';

const State = immutable.Record({
  isEditing: false,
  value: ''
});

const initialState = new State;

export default class Editable extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    editButtons: React.PropTypes.func,
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    isRequired: React.PropTypes.bool,
    maxRows: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    name: React.PropTypes.string.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onState: React.PropTypes.func.isRequired,
    rows: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    showEditButtons: React.PropTypes.bool,
    showViewButtons: React.PropTypes.bool,
    state: React.PropTypes.instanceOf(State),
    text: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    viewButtons: React.PropTypes.func
  }

  static defaultProps = {
    isRequired: true,
    showEditButtons: false,
    showViewButtons: false,
    editButtons: (onSaveClick, onCancelClick, disabled) =>
      <div className="btn-group">
        <button disabled={disabled} onClick={onSaveClick}>Save</button>
        <button disabled={disabled} onClick={onCancelClick}>Cancel</button>
      </div>,
    viewButtons: (onEditClick, disabled) =>
      <div className="btn-group">
        <button disabled={disabled} onClick={onEditClick}>Edit</button>
      </div>
  }

  constructor(props) {
    super(props);
    this.cancelEdit = ::this.cancelEdit;
    this.enableEdit = ::this.enableEdit;
    this.onInputChange = ::this.onInputChange;
    this.onInputFocus = ::this.onInputFocus;
    this.onInputKeyDown = ::this.onInputKeyDown;
    this.onViewClick = ::this.onViewClick;
    this.saveEdit = ::this.saveEdit;
  }

  onInputChange(e) {
    this.setState(state => state.set('value', e.target.value));
  }

  onInputFocus(e) {
    this.moveCaretToEnd(e.target);
  }

  moveCaretToEnd(field) {
    const isSelectable = /text|password|search|tel|url/.test(field.type);
    if (!isSelectable) return;
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
    if (this.props.type === 'textarea') return;
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
    if (!this.isDirty()) {
      this.disableEdit();
      return;
    }
    if (!confirm(msg('components.editable.cancelEdit'))) // eslint-disable-line no-alert
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
    const {
      className, disabled, editButtons, maxRows, rows, showEditButtons,
      showViewButtons, state, text, type, viewButtons
    } = this.props;
    const isEditing = state && state.isEditing;

    if (!isEditing) return (
      <div className={classnames('editable view', className)}>
        <span onClick={this.onViewClick}>{text}</span>
        {showViewButtons && viewButtons(this.enableEdit, disabled)}
      </div>
    );

    const fieldProps = {
      autoFocus: true,
      disabled: disabled,
      onChange: this.onInputChange,
      onFocus: this.onInputFocus,
      onKeyDown: this.onInputKeyDown,
      value: state.value
    };

    const field = type === 'textarea'
      ? <Textarea {...fieldProps} maxRows={maxRows} rows={rows} />
      : <input {...fieldProps} type={type || 'text'} />;

    return (
      <div className={classnames('editable edit', className)}>
        {field}
        {(showEditButtons || type === 'textarea') &&
          editButtons(this.saveEdit, this.cancelEdit, disabled)}
      </div>
    );

  }

}
