import {actions, create} from 'client/todos/actions';
import {expect} from 'chai';

// Actions are pure (without side effects) so testing is pretty straightforward.
// I think 100% test coverage is must in financial or public health industry,
// but for quick startup MVP, write only tests you really need.
// Don't get me wrong, I love TDD. But only for sophisticated logic.
// http://chaijs.com/api/bdd

describe('todos actions', () => {

  describe('addHundredTodos', () => {
    it('should dispatch addHundredTodos action', (done) => {
      const dispatch = action => {
        expect(action).to.equal(actions.addHundredTodos);
        done();
      };
      create(dispatch).addHundredTodos();
    });
  });

  describe('addTodo', () => {
    it('should dispatch addTodo with todo as payload', (done) => {
      const todo = {title: 'foo'};
      const dispatch = (action, payload) => {
        expect(action).to.equal(actions.addTodo);
        expect(payload).to.equal(todo);
        done();
      };
      create(dispatch).addTodo(todo);
    });

    it('should not dispatch if todo.title.trim() is falsy', () => {
      let dispatched = false;
      const dispatch = action => dispatched = true;
      create(dispatch).addTodo({title: ' '});
      expect(dispatched).to.equal(false);
    });
  });

});
