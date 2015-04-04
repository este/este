import PureComponent from '../../../lib/purecomponent';
import React from 'react';
import TodoItem from './todoitem';
import immutable from 'immutable';

export default class TodoList extends PureComponent {

  render() {
    return (
      <ol>
        {this.props.todos.map((todo, i) => {
          return <TodoItem todo={todo} key={todo.get('id')} />;
        })}
      </ol>
    );
  }

}

TodoList.propTypes = {
  todos: React.PropTypes.instanceOf(immutable.List)
};
