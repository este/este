import * as actions from '../actions';

it('addTodo creates todo', () => {
  const title = 'Hello';
  const deps = {
    getUid: () => 'uid',
    now: () => 1,
  };
  const action = actions.addTodo(title)(deps);
  expect(action).toEqual({
    type: 'ADD_TODO',
    payload: {
      todo: {
        completed: false,
        createdAt: 1,
        id: 'uid',
        title: 'Hello',
      },
    },
  });
});
