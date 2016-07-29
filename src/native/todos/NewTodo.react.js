import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import theme from '../../common/app/theme';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '../app/components';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  newTodo: {
    backgroundColor: theme.brandPrimary,
    borderTopColor: theme.lighten(theme.brandPrimary),
    borderTopWidth: StyleSheet.hairlineWidth,
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
    const { fields, intl: { formatMessage } } = this.props;

    return (
      <View style={styles.newTodo}>
        <TextInput
          {...fields.title}
          maxLength={100}
          onEndEditing={this.onTextInputEndEditing}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={formatMessage(newTodoMessages.placeholder)}
          placeholderTextColor={'#cce9f2'}
          viewStyle={styles.textInputView}
          inputStyle={styles.textInputInput}
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
