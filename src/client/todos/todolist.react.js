import PureComponent from '../components/purecomponent.react';
import React from 'react';
import TodoItem from './todoitem.react';
import immutable from 'immutable';

export default class TodoList extends PureComponent {

  render() {
    return (
      <ol>
        {this.props.todos.map((todo, i) => {
          return <TodoItem key={todo.get('id')} todo={todo} />;
        })}
      </ol>
    );
  }

}

TodoList.propTypes = {
  todos: React.PropTypes.instanceOf(immutable.List)
};
