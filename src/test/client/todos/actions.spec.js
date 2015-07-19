import {actions, create} from 'client/todos/actions';
import {expect} from 'chai';

// http://chaijs.com/api/bdd

describe('create', () => {
  it('is a function', () => {
    // TODO: Add real test.
    expect(create).to.be.a('function');
  });
});

describe('addTodo', () => {
  it('is a function', () => {
    // TODO: Add real test.
    expect(actions.addTodo).to.be.a('function');
  });
});
