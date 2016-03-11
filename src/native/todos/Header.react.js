import Component from 'react-pure-render/component';
import React from 'react-native';
import { connect } from 'react-redux';

// yahoo/react-intl still does not support React Native, but we can use format.
// https://github.com/yahoo/react-intl/issues/119
// import { format } from '../../common/intl/format';

const {
  StyleSheet, Text, View
} = React;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#31AACC',
    justifyContent: 'center',
    marginTop: -5,
    paddingBottom: 20,
    paddingTop: 10
  },
  header: {
    color: '#fff',
    fontSize: 20,
  }
});

class Header extends Component {

  // static propTypes = {
  //   // msg: PropTypes.object.isRequired,
  //   // todos: PropTypes.object.isRequired
  // };
  // const { todos } = this.props;
  // const leftTodos = todos.filter(todo => !todo.completed).size;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {/* (format(msg.leftList, { size: leftTodos })) */}
        </Text>
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map
}))(Header);
