import Component from 'react-pure-render/component';
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

const Button = (props) =>
  <TouchableOpacity
    activeOpacity={.9}
    onPress={props.onPress}
    style={styles.listButton}
  >
    <Text style={styles.listButtonText}>{props.children}</Text>
  </TouchableOpacity>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class TodoButtons extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasCompletedTodos: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired
  };

  render() {
    const {actions, hasCompletedTodos, msg} = this.props;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos
          ? <Button onPress={actions.clearAllCompletedTodos}>{msg.clearCompleted}</Button>
          : <Button onPress={actions.clearAllTodos}>{msg.clearAll}</Button>
        }
        <Button onPress={actions.addHundredTodos}>{msg.add100}</Button>
      </View>
    );
  }

}
