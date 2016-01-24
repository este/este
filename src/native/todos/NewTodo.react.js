import Component from 'react-pure-render/component';
import React from 'react-native';

const {
  PropTypes, StyleSheet, TextInput, View
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#31AACC',
    borderTopColor: '#73CEE7',
    borderTopWidth: 1,
    height: 62
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  }
});


export default class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onTextInputChangeText = this.onTextInputChangeText.bind(this);
    this.onTextInputEndEditing = this.onTextInputEndEditing.bind(this);
  }

  onTextInputChangeText(text) {
    const {actions} = this.props;
    actions.onNewTodoChange('title', text);
  }

  onTextInputEndEditing() {
    const {actions, todo} = this.props;
    actions.addTodo(todo);
  }

  render() {
    const {msg, todo} = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          // TODO: Use redux-form.
          onChangeText={this.onTextInputChangeText}
          onEndEditing={this.onTextInputEndEditing}
          placeholder={msg.newTodoPlaceholder}
          placeholderTextColor={'#cce9f2'}
          style={styles.input}
          value={todo.title}
        />
      </View>
    );
  }

}
