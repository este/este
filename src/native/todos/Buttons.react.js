import Component from '../components/Component.react';
import React from 'react-native';

const {
  PropTypes, StyleSheet, Text, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  listButton: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15
  },
  listButtonText: {
    color: '#C1C1C1',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default class TodoButtons extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasCompletedTodos: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired
  };

  render() {
    const {actions, hasCompletedTodos, msg} = this.props;
    // TODO: Use React 0.14 component.
    // https://github.com/facebook/react-native/issues/3369#issuecomment-147543147
    const Button = (action, text) =>
      <TouchableOpacity
        activeOpacity={.9}
        onPress={action}
        style={styles.listButton}
      >
        <Text style={styles.listButtonText}>{text}</Text>
      </TouchableOpacity>;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos
          ? Button(actions.clearAllCompletedTodos, msg.clearCompleted)
          : Button(actions.clearAllTodos, msg.clearAll)
        }
        {
          Button(actions.addHundredTodos, msg.add100)
        }
      </View>
    );
  }

}
