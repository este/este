import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
import immutable from 'immutable';
import merger from 'server/lib/merger';

chai.use(chaiImmutable);

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
    const state = immutable.fromJS(initialState).mergeWith(merger, userState).toJS();
    expect(state.todos.list).to.not.be.empty;
    expect(state.todos.list).to.be.an('array');
    expect(state.todos.list).to.have.length(2);
    expect(state.todos.list[0]).to.deep.equal(initialState.todos.list[0]);
    expect(state.todos.list[1]).to.deep.equal(userState.todos.list[0]);
  });

});
