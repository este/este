import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import theme from '../app/theme';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, TextInput, View } from 'react-native';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

const styles = StyleSheet.create({
  newTodo: {
    backgroundColor: theme.brandPrimary,
    borderTopColor: theme.lighten(theme.brandPrimary),
    borderTopWidth: 1,
    height: theme.fontSizeBase * 4,
  },
  input: {
    color: theme.inverseTextColor,
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: theme.fontSizeH5,
    marginLeft: theme.fontSizeBase,
    marginRight: theme.fontSizeBase,
  },
});

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
  };

  constructor() {
    super();
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
    const { fields } = this.props;

    return (
      <View style={styles.newTodo}>
        <FormattedMessage {...newTodoMessages.placeholder}>
          {message => <TextInput
            {...fields.title}
            autoCorrect={false}
            maxLength={100} // React Native needs explicit maxLength.
            onEndEditing={this.onTextInputEndEditing}
            onSubmitEditing={this.onSubmitEditing}
            placeholder={message}
            placeholderTextColor={'#cce9f2'}
            style={styles.input}
          />}
        </FormattedMessage>
      </View>
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title'],
});

export default connect(null, { addTodo })(NewTodo);
