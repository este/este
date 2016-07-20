import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../app/theme';
import { Button } from '../app/components';
import { Image, StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  todo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    color: theme.textColor,
    flex: 1,
    fontSize: theme.fontSizeBase,
    paddingRight: theme.fontSizeH5,
  },
  checkbox: {
    height: theme.fontSizeH5,
    marginLeft: theme.fontSizeH5,
    marginRight: theme.fontSizeH5,
    width: theme.fontSizeH5,
  }
});

export default class Todo extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onTouchableOpacityPress = this.onTouchableOpacityPress.bind(this);
  }

  onTouchableOpacityPress() {
    const { todo, toggleTodoCompleted } = this.props;
    toggleTodoCompleted(todo);
  }

  render() {
    const { todo } = this.props;
    const image = todo.completed
      ? require('./img/SelectedCheckbox.png')
      : require('./img/EmptyCheckbox.png');

    return (
      <View style={styles.todo}>
        <Button onPress={this.onTouchableOpacityPress}>
          <Image source={image} style={styles.checkbox} />
        </Button>
        <TextInput
          editable={false}
          style={[styles.input]}
          value={todo.title}
        />
      </View>
    );
  }

}
