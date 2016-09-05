/* @flow */
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Button, Space, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { connect } from 'react-redux';

const Buttons = ({ addHundredTodos, clearAllTodos, todos }) => (
  <View>
    <Button disabled={todos.size === 0} onClick={clearAllTodos}>
      <FormattedMessage {...buttonsMessages.clearAll} />
    </Button>
    <Space />
    <Button onClick={addHundredTodos}>
      <FormattedMessage {...buttonsMessages.add100} />
    </Button>
  </View>
);

Buttons.propTypes = {
  addHundredTodos: React.PropTypes.func.isRequired,
  clearAllTodos: React.PropTypes.func.isRequired,
  todos: React.PropTypes.object.isRequired,
};

export default connect(state => ({
  todos: state.todos.map,
}), { addHundredTodos, clearAllTodos })(Buttons);
