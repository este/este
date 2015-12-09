import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Todo from './Todo.react';

export default class List extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  }

  render() {
    const {actions, map, msg} = this.props;

    if (!map.size)
      return <p>{msg.emptyList}</p>;

    const list = map.toList().sortBy(item => item.createdAt);

    return (
      <ol className="todos">
        {list.map(todo =>
          <Todo {...{actions, todo}} key={todo.id} />
        )}
      </ol>
    );
  }

}
