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
    fields: PropTypes.object,
    msg: PropTypes.object,
    todos: PropTypes.object
  };

  render() {
    const {actions, fields, msg: {todos: msg}, todos} = this.props;

    return (
      <div className="todos-page">
        <Helmet title={msg.title} />
        {/* Model is passed only to enforce pure component rerender. */}
        <NewTodo {...{actions, msg}} model={fields.getIn(['newTodo'])} />
        <Todos {...{actions, msg}} map={todos.map} />
        <Buttons {...{actions, msg}} clearAllEnabled={todos.map.size > 0} />
      </div>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default Page;
