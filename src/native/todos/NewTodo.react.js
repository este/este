import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

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

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onTextInputEndEditing = this.onTextInputEndEditing.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onTextInputEndEditing() {
    const { addTodo, fields } = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  onSubmitEditing() {
    this.onTextInputEndEditing();
  }

  render() {
    const { fields, msg } = this.props;
    const { title } = fields;

    return (
      <View style={styles.container}>
        <TextInput
          maxLength={100} // React Native needs explicit maxLength.
          onEndEditing={this.onTextInputEndEditing}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={msg.newTodoPlaceholder}
          placeholderTextColor={'#cce9f2'}
          style={styles.input}
          {...title}
        />
      </View>
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

export default connect(state => ({
  msg: state.intl.msg.todos
}), todosActions)(NewTodo);
