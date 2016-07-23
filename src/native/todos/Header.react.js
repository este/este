import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../app/theme';
import { FormattedMessage, defineMessages } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { Text } from '../app/components';
import { connect } from 'react-redux';

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
    marginTop: -2, // To override app header borderBottom.
    paddingBottom: theme.fontSizeH5,
    paddingTop: theme.fontSizeBase * .625,
  },
  text: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH5,
  },
});

class Header extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
  };

  render() {
    const { todos } = this.props;
    const leftTodos = todos.filter(todo => !todo.completed).size;

    return (
      <View style={styles.header}>
        <FormattedMessage {...messages.leftTodos} values={{ leftTodos }}>
          {message => <Text style={styles.text}>{message}</Text>}
        </FormattedMessage>
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map,
}))(Header);
