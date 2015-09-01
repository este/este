import React, {View} from 'react-native';
import Component from './component.react';

// This component disables interactions when isDisabled prop
// is true. Used to disable interactions with content when side menu is toggled
export default class ContentView extends Component {

  static propTypes = {
    children: React.PropTypes.any,
    isDisabled: React.PropTypes.bool.isRequired,
    onDisabledTap: React.PropTypes.func
  }

  static defaultProps = {
    onDisabledTap: () => {}
  }

  onPress(e) {
    if (this.props.isDisabled)
      this.props.onDisabledTap();
  }

  render() {
    const {isDisabled} = this.props;

    return (
      <View
        onResponderRelease={this.onPress.bind(this)}
        onStartShouldSetResponderCapture={_ => isDisabled}
        style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }

}
