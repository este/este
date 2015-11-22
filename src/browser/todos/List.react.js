import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Todo from './Todo.react';

export default class List extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  }

  render() {
    const {actions, list, msg} = this.props;

    if (!list.size)
      return <p>{msg.emptyList}</p>;

    return (
      <ol className="todos">
        {list.map(todo =>
          <Todo {...{actions, todo}} key={todo.id} />
        )}
      </ol>
    );
  }

}
