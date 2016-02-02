import Component from 'react-pure-render/component';
import React from 'react-native';
import fields from '../../common/components/fields';

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


class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onTextInputEndEditing = this.onTextInputEndEditing.bind(this);
  }

  onTextInputEndEditing() {
    const {actions, fields} = this.props;
    if (!fields.title.value.trim()) return;
    actions.addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const {fields, msg} = this.props;
    const {title} = fields;

    return (
      <View style={styles.container}>
        <TextInput
          maxLength={100} // React Native needs explicit maxLength.
          onEndEditing={this.onTextInputEndEditing}
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

export default NewTodo;
