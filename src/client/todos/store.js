import Todo from './todo';
import getRandomString from '../lib/getrandomstring';
import {Range, Record} from 'immutable';
import {actions} from './actions';

// Records are good. https://facebook.github.io/immutable-js/docs/#/Record
const initialState = new (Record({
  list: [],
  newTodo: null
}));

const revive = state => initialState.merge({
  list: state.get('list').map(todo => new Todo(todo)),
  newTodo: new Todo(state.get('newTodo'))
});

function getRandomTodos(howMuch) {
  return Range(0, howMuch).map(() => {
    const id = getRandomString();
    return new Todo({id, title: `Item #${id}`});
  }).toArray();
}

export default function(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

  case actions.addHundredTodos:
    return state.update('list', list => list.push(...getRandomTodos(100)));

  // Note how we use block in switch case so const bindings don't clash.
  case actions.addTodo: {
    const newTodo = payload.merge({id: getRandomString()});
    return state
      .update('list', list => list.push(newTodo))
      .set('newTodo', new Todo);
  }

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
