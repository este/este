import * as actions from '../actions.js';
import { expect } from 'chai';

describe('todos actions', () => {
  // // Async testing example.
  // it('should do something async', done => {
  //   setTimeout(() => {
  //     expect('foo').equal('bar');
  //     done();
  //   }, 500)
  // });

  it('should create todo', () => {
    const deps = {
      getUid: () => 'uid',
      now: () => 'now',
    };
    const action = actions.addTodo('Hello')(deps);
    const { type, payload } = action;
    expect(type).equal('ADD_TODO');
    expect(payload.createdAt).equal('now');
    expect(payload.id).equal('uid');
    expect(payload.title).equal('Hello');
  });
});
