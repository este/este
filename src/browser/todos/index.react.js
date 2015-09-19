import Buttons from './buttons.react';
import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import NewTodo from './newtodo.react';
import React, {PropTypes} from 'react';
import Todos from './todos.react';

export default class TodosIndex extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    todos: PropTypes.object
  }

  render() {
    const {actions, msg: {todos: msg}, todos: {newTodo, list}} = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="todos-page">
          <NewTodo {...{actions, msg, newTodo}} />
          <Todos {...{actions, list, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
        </div>
      </DocumentTitle>
    );
  }

}
