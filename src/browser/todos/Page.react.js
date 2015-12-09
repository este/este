import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import List from './List.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes} from 'react';
import fetch from '../components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

// This decorator (higher order component) fetches todos both in browser and
// on server side. It's true isomorphic data fetching and rendering.
@fetch(fetchUserTodos)
export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    todos: PropTypes.object
  }

  render() {
    const {actions, msg: {todos: msg}, todos: {map, newTodo}} = this.props;

    return (
      <div className="todos-page">
        <Helmet title={msg.title} />
        <NewTodo {...{actions, msg, newTodo}} />
        <List {...{actions, map, msg}} />
        <Buttons clearAllEnabled={map.size > 0} {...{actions, msg}} />
      </div>
    );
  }

}
