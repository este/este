jest.dontMock('../merger');
jest.dontMock('immutable');

const merger = require('../merger');
const Immutable = require('immutable');

describe('merger', () => {

  const initialState = {
    todos: {
      list: [
        {id: 1, title: 'Consider `stop doing` app'}
      ]
    }
  };

  const userState = {
    todos: {
      list: [
        {id: 2, title: 'relax'}
      ]
    }
  };

  it('should merge deep lists', () => {
    const state = Immutable.fromJS(initialState).mergeWith(merger, userState).toJS();
    expect(state.todos.list.length).toBe(2);
    expect(state.todos.list[0]).toEqual(initialState.todos.list[0]);
    expect(state.todos.list[1]).toEqual(userState.todos.list[0]);
  });

});
