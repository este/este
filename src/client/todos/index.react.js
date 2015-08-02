import Buttons from './buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import NewTodo from './newtodo.react';
import React from 'react';
import ToCheck from './tocheck.react';
import Todos from './todos.react';

export default class Index extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
  }

  render() {
    const {
      todos: {newTodo, list},
      actions: {todos: actions},
      msg: {todos: msg}
    } = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="todos-page">
          <NewTodo {...{newTodo, actions, msg}} />
          {/* It's just shorter syntax for:
            <NewTodo actions={actions} msg={msg} newTodo={newTodo} />
          */}
          <Todos {...{list, actions, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
          <ToCheck msg={msg.toCheck} />
        </div>
      </DocumentTitle>
    );
  }

}
