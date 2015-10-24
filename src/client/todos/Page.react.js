import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import List from './List.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes} from 'react';
import fetch from '../../common/components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

// This decorator (higher order component) fetches todos both on client and
// server side. It's true isomorphic data fetching and rendering.
@fetch(fetchUserTodos)
export default class Page extends Component {

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
          <List {...{actions, list, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
        </div>
      </DocumentTitle>
    );
  }

}
