// To make your app truly isomorphic, we need to wrap WebEvents in React Native
import React, {TextInput} from 'react-native';
import {autobind} from 'core-decorators';
import PureComponent from '../components/component.react';

export default class Input extends PureComponent {

  static propTypes = {
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onEndEditing: React.PropTypes.func
  }

  static defaultProps = {
    onChange: function() {},
    onEndEditing: function() {}
  }

  @autobind
  onFieldChange(event) {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: event.nativeEvent.text
      }
    });
  }

  @autobind
  onEndEditing(event) {
    this.props.onEndEditing({
      target: {
        name: this.props.name,
        value: event.nativeEvent.text
      }
    });
  }

  blur() {
    this.refs.textInput.blur();
  }

  render() {
    return (
      <TextInput
        {...this.props}
        onChange={this.onFieldChange}
        onEndEditing={this.onEndEditing}
        ref='textInput'
      />
    );
  }

}
