import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import NewTodo from './NewTodo.react';
import React, {PropTypes} from 'react';
import Todos from './Todos.react';
import fetch from '../../common/components/fetch';
import {connect} from 'react-redux';
import {fetchUserTodos} from '../../common/todos/actions';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="todos-page">
        <Helmet title={msg.title} />
        <NewTodo />
        <Todos />
        <Buttons />
      </div>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default connect(state => ({
  msg: state.intl.msg.todos
}))(Page);
