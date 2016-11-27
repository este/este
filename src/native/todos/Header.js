/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import theme from '../app/themes/initial';
import { FormattedMessage } from '../app/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  leftTodos: {
    defaultMessage: `{leftTodos, plural,
      =0 {Nothing, enjoy :-)}
      one {You have {leftTodos} task}
      other {You have {leftTodos} tasks}
    }`,
    id: 'todos.leftTodos',
  },
});

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: theme.brandPrimary,
    justifyContent: 'center',
    paddingTop: theme.fontSize,
    paddingBottom: theme.fontSize * 0.5,
  },
  text: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH5,
  },
});

const Header = ({ todos }) => {
  const leftTodos = R.values(todos).filter(todo => !todo.completed).length;
  return (
    <View style={styles.header}>
      <FormattedMessage
        {...messages.leftTodos}
        style={styles.text}
        values={{ leftTodos }}
      />
    </View>
  );
};

Header.propTypes = {
  todos: React.PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
)(Header);
