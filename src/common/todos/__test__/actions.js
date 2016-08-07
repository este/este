import * as actions from '../actions';
import test from 'ava';

// Learn AVA:
//  - speakerdeck.com/novemberborn/ava-at-lnug
//  - shift.infinite.red/testing-the-bejeezus-out-of-react-native-apps-with-ava-330f51f8f6c3
//  - http://silvenon.com/testing-react-and-redux/

// Test assertions with a non-clever syntax:
//  - t.true(someBool);
//  - t.deepEqual(a, b);
//  - t.is(a, b);
//  - github.com/avajs/ava#assertions

test('addTodo creates todo', t => {
  const title = 'Hello';
  const deps = {
    getUid: () => 'uid',
    now: () => 1,
  };
  const action = actions.addTodo(title)(deps);
  t.deepEqual(action, {
    type: 'ADD_TODO',
    payload: {
      createdAt: 1,
      id: 'uid',
      title: 'Hello',
    },
  });
});
