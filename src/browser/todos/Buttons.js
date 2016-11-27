/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Button, Space, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { connect } from 'react-redux';

const Buttons = ({ addHundredTodos, clearAllTodos, isEmpty }) => (
  <View>
    <Button disabled={isEmpty} onClick={clearAllTodos}>
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
  isEmpty: React.PropTypes.bool.isRequired,
};

export default connect(
  (state: State) => ({
    isEmpty: R.isEmpty(state.todos.all),
  }),
  { addHundredTodos, clearAllTodos },
)(Buttons);
