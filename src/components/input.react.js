import React from 'react-native';
import Component from './component.react';
import {
  TextInput
} from 'react-native';

class Input extends Component {

  /**
   * This is on purpose. In this particular case, we do not want
   * to keep the input in sync with the passed value as this produces
   * flickering due to some race conditions between Objective-C / Javascript.
   * In order to keep it blazing fast yet correct, we sync on blur, once
   * user finishes editing
   */
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.state = {
      value: this.props.value
    };
  }

  /**
   * Bubbles up native event
   */
  onFieldChange(event) {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: event.nativeEvent.text
      }
    });
    this.setState({
      editing: true
    });
  }

  /**
   * When editing finishes, we update the in-component state
   * with the current value passed via props.
   */
  onEndEditing() {
    this.props.onEndEditing();
    this.setState({
      value: this.props.value,
      editing: true
    });
  }

  /**
   * When input is not focused, update its state
   * This cannot happen while user is entering text to avoid
   * race conditions hence the check
   */
  componentWillReceiveProps({value}) {
    if (!this.state.editing)
      this.setState({
        value: value
      });
  }

  /**
   * Dismisses the underlaying textInput
   * making the keyboard dissapear. This is just a proxy to NativeMixins
   * that are only exposed on built-in React Native components (like TextInput)
   */
  blur() {
    this.refs.textInput.blur();
  }

  /**
   * Renders actual input
   */
  render() {
    const value = this.state.value;

    return (
      <TextInput
        {...this.props}
        onChange={this.onFieldChange}
        onEndEditing={this.onEndEditing}
        ref='textInput'
        value={value}
      />
    );
  }

}

Input.propTypes = {
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onEndEditing: React.PropTypes.func,
  value: React.PropTypes.any.isRequired
};

Input.defaultProps = {
  onChange: function() {},
  onEndEditing: function() {}
};

export default Input;
