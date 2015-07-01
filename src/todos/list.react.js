import React from 'react-native';
import Todo from './todo.react';
import immutable from 'immutable';
import {msg} from '../intl/store';
import {
  View,
  Text,
  ListView,
  Image
} from 'react-native';

import style from './list.style';

const simpleComparator = (r1, r2) => r1 !== r2;

class List extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  dataStore = new ListView.DataSource({
    sectionHeaderHasChanged: simpleComparator,
    rowHasChanged: simpleComparator
  })

  renderRow(todo) {
    const {editables, pendingActions} = this.props;

    return (
      <View style={style.row}>
        <Todo
          key={todo.id}
          todo={todo}
        />
      </View>
    );
  }

  render() {
    const {todos} = this.props;
    const dataSource = this.dataStore.cloneWithRows(todos.toJS());

    if (!todos.size)
      return (
        <View style={style.centeredView}>
          <Image
            source={require('image!Empty State')}
            style={style.icon}
          />
          <Text style={style.noTodosText}>
            {msg('todos.emptyList')}
          </Text>
        </View>
      );

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    );
  }

}

List.propTypes = {
  editables: React.PropTypes.instanceOf(immutable.Map).isRequired,
  pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
  todos: React.PropTypes.instanceOf(immutable.List)
};

export default List;
