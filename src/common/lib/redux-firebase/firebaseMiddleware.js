import * as actions from './actions';
import Firebase from 'firebase';
import invariant from 'invariant';

const arrayify = item => [].concat(item);

export default function firebaseMiddleware(firebase) {
  invariant(firebase instanceof Firebase,
    'Expected the firebase to be an instance of Firebase.');

  const on = ({component, props, query}) => {
    invariant(typeof query.child === 'string',
      'Expected the query.child to be a string.');

    let ref = firebase.child(query.child);

    ['startAt', 'endAt', 'equalTo']
      .filter(method => query[method])
      .forEach(method => {
        const args = arrayify(query[method]);
        ref = ref[method](...args);
      });

    Object.keys(query)
      .filter(method => method.startsWith('limit') || method.startsWith('order'))
      .forEach(method => {
        const value = query[method];
        const args = value === true ? [] : [value];
        ref = ref[method](...args);
      });

    const createArgs = eventTypes => Object.keys(eventTypes).map(eventType => {
      const callbacks = arrayify(eventTypes[eventType])
        .map(callback => (...args) => callback(props, ...args));
      return [eventType, ...callbacks];
    });

    if (query.once) {
      const args = createArgs(query.once);
      args.forEach(arg => ref.once(...arg));
    }

    if (query.on) {
      const args = createArgs(query.on);
      component._firebaseOnQueryArgs = args;
      args.forEach(arg => ref.on(...arg));
    }

  };

  const off = ({component, query}) => {
    if (!query.on) return;
    const ref = firebase.child(query.child);
    component._firebaseOnQueryArgs.forEach(arg => {
      ref.off(...arg);
    });
  };

  return () => next => action => {
    switch (action.type) {
      case actions.REDUX_FIREBASE_ON_QUERY:
        on(action.payload);
        break;
      case actions.REDUX_FIREBASE_OFF_QUERY:
        off(action.payload);
        break;
    }
    return next(action);
  };

}
