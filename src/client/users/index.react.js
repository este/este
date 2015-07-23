import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import Users from './users.react';

export default class Index extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  };

  /*static fetchData(actions) {
    return actions.todos.loadAllTodos();
  }

  componentDidMount() {
    const {todos, actions} = this.props;

    if (!todos.list.size > 0)
      Page.fetchData(actions);
  }*/

  render() {
    const {
      actions: {todos: actions},
      msg: {todos: msg}
    } = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="users-page">
            <Users {...{actions, msg}} />
          </div>
        </DocumentTitle>
      );
    }

  }
