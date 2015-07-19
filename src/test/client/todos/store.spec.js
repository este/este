import Todo from 'client/todos/todo';
import immutable from 'immutable';
import store from 'client/todos/store';
import {actions} from 'client/todos/actions';
import {expect} from 'chai';

describe('todos store', () => {

  describe('store()', () => {
    it('should set initial state', () => {
      const state = store();
      expect(state.list).to.be.empty;
      expect(state.newTodo).to.be.an.instanceOf(Todo);
    });
    it('should set revived state', () => {
      const state = store(immutable.fromJS({
        list: [{title: 'list'}],
        newTodo: {title: 'newTodo'}
      })).toJS();
      expect(state.list).to.have.length(1);
      expect(state.list[0].title).to.equal('list');
      expect(state.newTodo.title).to.equal('newTodo');
    });
  });

  describe('addTodo', () => {
    it('should add new todo into list and reset newTodo', () => {
      const stateBefore = store(immutable.fromJS({
        list: [],
        newTodo: new Todo({title: '1'})
      }));
      const newTodo = new Todo({title: 2});
      const stateAfter = store(stateBefore, actions.addTodo, newTodo);
      expect(stateAfter.toJS().list).to.have.length(1);
      expect(stateAfter.toJS().newTodo.title).to.equal('');
    });
  });

});
