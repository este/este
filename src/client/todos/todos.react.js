import Component from '../components/component.react';
import React from 'react';
import Todo from './todo.react';

export default class List extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {actions, list, msg} = this.props;

    if (!list.size) return (
      <p>{msg.emptyList}</p>
    );

    return (
      <ol className="todos">
        {list.map(todo =>
          <Todo actions={actions} key={todo.id} todo={todo} />
        )}
      </ol>
    );
  }

}
