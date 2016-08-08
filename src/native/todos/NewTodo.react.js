import React, { Component, PropTypes } from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import theme from '../app/theme';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '../app/components';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  newTodo: {
    backgroundColor: theme.brandPrimary,
  },
  textInputInput: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH5,
    marginHorizontal: theme.fontSize,
  },
  textInputView: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingVertical: theme.fontSize * .75,
  },
});

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  constructor() {
    super();
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onSubmitEditing() {
    const { addTodo, fields } = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const { fields, intl: { formatMessage } } = this.props;

    return (
      <View style={styles.newTodo}>
        <TextInput
          {...fields.title}
          inputStyle={styles.textInputInput}
          maxLength={100}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={formatMessage(newTodoMessages.placeholder)}
          placeholderTextColor={'#cce9f2'}
          viewStyle={styles.textInputView}
        />
      </View>
    );
  }

}

NewTodo = injectIntl(NewTodo);

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title'],
});

export default connect(null, { addTodo })(NewTodo);
