import PureComponent from '../../../lib/purecomponent'
import React from 'react'
import TodoItem from './todoitem'
import immutable from 'immutable'

export default class TodoList extends PureComponent {

  render() {
    return (
      <ol>
        {this.props.todos.map((todo, i) => {
          return <TodoItem todo={todo} key={todo.get('id')} />
        })}
      </ol>
    )
  }

}

// Note only static methods can be defined in a class, no object props.
// https://github.com/babel/babel/issues/57#issuecomment-58834201
TodoList.propTypes = {
  todos: React.PropTypes.instanceOf(immutable.Iterable)
}
