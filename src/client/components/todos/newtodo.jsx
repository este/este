import React from 'react'
import immutable from 'immutable'
import {IntlMixin} from 'react-intl'
import {addTodo, onNewTodoFieldChange} from '../../todos/actions'
import {addons} from 'react/addons'

export default React.createClass({
  // TODO: Refactor to less boilerplate after React 0.13 release.
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    todo: React.PropTypes.instanceOf(immutable.Map)
  },

  onKeyDown(e) {
    if (e.key == 'Enter')
      addTodo(this.props.todo)
  },

  render() {
    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={onNewTodoFieldChange}
        onKeyDown={this.onKeyDown}
        placeholder={this.getIntlMessage('todos.newTodoPlaceholder')}
        value={this.props.todo.get('title')}
      />
    )
  }

})
