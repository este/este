import Todo from './todo';
import getRandomString from '../lib/getrandomstring';
import {Range, Record, Map} from 'immutable';
import {actions} from './actions';

function revive(state) {
  // Records are good. They allow us to use immutable without getters.
  // Revive simply convert maps to concrete structures.
  return new (Record({
    editables: Map(),
    newTodo: new Todo(state.get('newTodo')),
    // User can get list of todos from server as well, make Todos from them.
    list: state.get('list').map(todo => new Todo(todo))
  }));
}

function getRandomTodos(howMuch) {
  return Range(0, howMuch).map(() => {
    const id = getRandomString();
    return new Todo({id, title: `Item #${id}`});
  }).toArray();
}

export default function(state, action, payload) {
  if (!action) state = revive(state);

  switch (action) {

    case actions.addHundredTodos:
      return state.update('list', list => list.push(...getRandomTodos(100)));

    case actions.addTodo:
      return state
        .update('list', list => {
          const newTodo = payload.merge({id: getRandomString()});
          return list.push(newTodo);
        })
        .set('newTodo', new Todo);

    case actions.clearAll:
      return state
        .update('list', list => list.clear())
        .set('newTodo', new Todo);

    case actions.deleteTodo:
      return state.update('list', list => list.delete(list.indexOf(payload)));

    case actions.setNewTodoField:
      return state.setIn(['newTodo', payload.name], payload.value);

  }

  return state;
}

//     case actions.onEditableSave:
//       todosCursor(todos => {
//         const {id, name, value} = data;
//         return todos.update('list', list => {
//           const idx = list.findIndex(todo => todo.id === id);
//           return list.setIn([idx, name], value);
//         });
//       });
//       break;

//     case actions.onEditableState:
//       todosCursor(todos => {
//         const {id, name, state} = data;
//         return todos.setIn(['editables', id, name], state);
//       });
//       break;

//   }

// });
