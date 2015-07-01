import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {
  View,
  Text
} from 'react-native';
import style from './todo.style';

class Todo extends Component {

  render() {
    return (
      <View>
        <Text>{this.props.todo.title}</Text>
      </View>
    );
  }

}

Todo.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  editable: React.PropTypes.instanceOf(immutable.Map),
  todo: React.PropTypes.instanceOf(immutable.Record).isRequired
};

export default Todo;
