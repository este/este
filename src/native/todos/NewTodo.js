/* @flow */
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import theme from '../app/themes/initial';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '../app/components';
import { addTodo } from '../../common/todos/actions';
import { compose } from 'ramda';
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
    paddingVertical: theme.fontSize * 0.75,
  },
});

const NewTodo = ({ addTodo, fields, intl }) => {
  const onSubmitEditing = () => {
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  };
  return (
    <View style={styles.newTodo}>
      <TextInput
        {...fields.title}
        inputStyle={styles.textInputInput}
        maxLength={100}
        onSubmitEditing={onSubmitEditing}
        placeholder={intl.formatMessage(newTodoMessages.placeholder)}
        placeholderTextColor={'#cce9f2'}
        viewStyle={styles.textInputView}
      />
    </View>
  );
};

NewTodo.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default compose(
  connect(
    null,
    { addTodo },
  ),
  fields({
    path: 'newTodo',
    fields: ['title'],
  }),
  injectIntl,
)(NewTodo);
