// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import todosMessages from '../../common/todos/todosMessages';
import { Box, Text, TextInput } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Image, ScrollView } from 'react-native';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { toggleTodoCompleted } from '../../common/todos/actions';

// import Buttons from './Buttons';
// import Todo from './Todo';

type TodosProps = {
  todos: Array<Todo>,
  toggleTodoCompleted: typeof toggleTodoCompleted,
};

const IsEmpty = () => (
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Image source={require('./img/EmptyState.png')} />
    <FormattedMessage {...todosMessages.empty}>
      {message =>
        <Text
          bold
          color="gray"
          marginTop={1}
          size={1}
        >{message}</Text>
      }
    </FormattedMessage>
  </Box>
);

const Todos = ({
  todos,
  toggleTodoCompleted,
}: TodosProps) => {
  if (isEmpty(todos)) {
    return <IsEmpty />;
  }
  return (
    <ScrollView>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>
      <Text>fok</Text>

    </ScrollView>
  )
  return null;
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { toggleTodoCompleted },
)(Todos);


// import { Image, ScrollView, StyleSheet, View } from 'react-native';
//
//   row: {
//     borderBottomColor: theme.separator,
//     borderBottomWidth: 1,
//     height: 53,
//   },
// });
//
// const Todos = ({ todos, toggleTodoCompleted }) => {
//   if (isEmpty(todos)) {
//     return (
//       <CenteredContainer>
//         <Image
//           source={require('./img/EmptyState.png')}
//           style={styles.icon}
//         />
//         <FormattedMessage {...todosMessages.empty} style={styles.empty} />
//       </CenteredContainer>
//     );
//   }
//
//   const sortedTodos = compose(
//     reverse,
//     sortBy(prop('createdAt')),
//     values, // object values to array
//   )(todos);
//
//   return (
//     <ScrollView>
//       {sortedTodos.map(todo =>
//         <View key={todo.id} style={styles.row}>
//           <Todo todo={todo} toggleTodoCompleted={toggleTodoCompleted} />
//         </View>,
//       )}
//       <Buttons />
//     </ScrollView>
//   );
// };
//
