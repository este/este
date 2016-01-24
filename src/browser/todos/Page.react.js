import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import NewTodo from './NewTodo.react';
import React, {PropTypes} from 'react';
import Todos from './Todos.react';
import fetch from '../../common/components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

class Page extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    todos: PropTypes.object
  };

  render() {
    const {actions, msg: {todos: msg}, todos: {map, newTodo}} = this.props;

    return (
      <div className="todos-page">
        <Helmet title={msg.title} />
        <NewTodo {...{actions, msg, newTodo}} />
        <Todos {...{actions, map, msg}} />
        <Buttons clearAllEnabled={map.size > 0} {...{actions, msg}} />
      </div>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default Page;
