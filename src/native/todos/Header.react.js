import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const messages = defineMessages({
  leftTodos: {
    defaultMessage: `{leftTodos, plural,
      =0 {Nothing, enjoy :-)}
      one {You have {leftTodos} task}
      other {You have {leftTodos} tasks}
    }`,
    id: 'todos.leftTodos'
  }
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#31AACC',
    justifyContent: 'center',
    marginTop: -5,
    paddingBottom: 20,
    paddingTop: 10
  },
  header: {
    color: '#fff',
    fontSize: 20,
  }
});

class Header extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired
  };

  render() {
    const { todos } = this.props;
    const leftTodos = todos.filter(todo => !todo.completed).size;

    return (
      <View style={styles.container}>
        <FormattedMessage {...messages.leftTodos} values={{ leftTodos }}>
          {message => <Text style={styles.header}>{message}</Text>}
        </FormattedMessage>
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map
}))(Header);
