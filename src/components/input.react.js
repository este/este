import React from 'react-native';
import {
  TextInput
} from 'react-native';

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  onFieldChange(event) {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: event.nativeEvent.text
      }
    });
  }

  onEndEditing() {
    this.refs.textInput.setNativeProps({
      text: this.props.value
    });
    this.props.onEndEditing();
  }

  componentWillReceiveProps({value}) {
    if (!value.length)
      this.refs.textInput.setNativeProps({
        value: value
      });
  }

  blur() {
    this.refs.textInput.blur();
  }

  render() {
    const value = this.props.value;
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
