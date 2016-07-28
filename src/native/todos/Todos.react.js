import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Todo from './Todo.react';
import theme from '../../common/app/theme';
import todosMessages from '../../common/todos/todosMessages';
import { CenteredContainer, FormattedMessage } from '../app/components';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { toggleTodoCompleted } from '../../common/todos/actions';

const styles = StyleSheet.create({
  empty: {
    color: theme.placeholderTextColor,
    fontSize: theme.fontSizeH5,
  },
  icon: {
    height: 60,
    marginBottom: 10,
    width: 60,
  },
  row: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    height: 53,
  },
});

class Todos extends Component {

  static propTypes = {
    todos: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired,
  };

  render() {
    const { todos, toggleTodoCompleted } = this.props;

    if (todos.size === 0) {
      return (
        <CenteredContainer>
          <Image
            source={require('./img/EmptyState.png')}
            style={styles.icon}
          />
          <FormattedMessage {...todosMessages.empty} style={styles.empty} />
        </CenteredContainer>
      );
    }

    const list = todos.toList().sortBy(item => item.createdAt).reverse();

    return (
      <ScrollView>
        {list.map(todo =>
          <View key={todo.id} style={styles.row}>
            <Todo todo={todo} toggleTodoCompleted={toggleTodoCompleted} />
          </View>
        )}
        <Buttons />
      </ScrollView>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map,
}), { toggleTodoCompleted })(Todos);
