// Higher order component for declarative Firebase queries.
// No more on / off madness.
// TODO: Support server rendering via componentWillMount.
// Example:
// Users = queryFirebase(Users, props => ({
//   // Query path to listen. For one user we can use `users/${props.userId}`.
//   child: 'users',
//   // firebase.com/docs/web/api/query
//   params: [
//     ['orderByChild', 'authenticatedAt'],
//     ['limitToFirst', props.limitToFirst]
//   ],
//   on: {
//     value: (snapshot) => props.setUsersList(snapshot.val())
//   }
// }));

import * as actions from './actions';
import Component from 'react-pure-render/component';
import Firebase from 'firebase';
import React, {PropTypes} from 'react';
import invariant from 'invariant';

const ensureArray = item => [].concat(item);
// Use key whenever you want to force off / on event registration. It's useful
// when queried component must be rerendered, for example when app state is
// recycled on logout. Then we can just set the key to current viewer.
const optionsToPayload = ({child, key, params}) => ({child, key, params});
const optionsToPayloadString = options => JSON.stringify(optionsToPayload(options));

export default function queryFirebase(Wrapped, mapPropsToOptions) {

  return class FirebaseQuery extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    constructor(props) {
      super(props);
      // Redux actions ftw, still we can call setState in action handler.
      this.state = {};
    }

    // {value: fn} -> [['value', fnWithProps]] or
    // {value: [fn1, fn2]} -> [['value', fnWithProps1, fnWithProps2]]
    createArgs(eventTypes = {}) {
      return Object.keys(eventTypes)
        .map(eventType => [
          eventType,
          ...ensureArray(eventTypes[eventType])
            .map(fn => (...args) => fn.apply(this, [...args, this.props]))
        ]);
    }

    dispatch(callback) {
      this.context.store.dispatch(({firebase}) => {
        invariant(firebase instanceof Firebase,
          'Expected the firebase to be an instance of Firebase.');
        const options = mapPropsToOptions(this.props);
        invariant(typeof options.child === 'string',
          'Expected the child to be a string.');
        const ref = firebase.child(options.child);
        const type = callback(ref, options);
        const payload = optionsToPayload(options);
        return {type, payload};
      });
    }

    on() {
      this.dispatch((ref, {on, once, params = []}) => {
        // Map declarative params to Firebase imperative API.
        params.forEach(([method, ...args]) => {
          ref = ref[method](...args);
        });
        this.onArgs = this.createArgs(on);
        this.onArgs.forEach(arg => ref.on(...arg));
        this.onceArgs = this.createArgs(once);
        this.onceArgs.forEach(arg => ref.once(...arg));
        return actions.REDUX_FIREBASE_ON_QUERY;
      });
    }

    off() {
      this.dispatch(ref => {
        this.onArgs.forEach(arg => ref.off(...arg));
        this.onceArgs.forEach(arg => ref.off(...arg));
        return actions.REDUX_FIREBASE_OFF_QUERY;
      });
    }

    componentDidMount() {
      this.on();
    }

    componentDidUpdate(prevProps) {
      const prevOptions = optionsToPayloadString(mapPropsToOptions(prevProps));
      const options = optionsToPayloadString(mapPropsToOptions(this.props));
      // Detect only options change is must to avoid loops.
      if (prevOptions === options) return;
      this.off();
      this.on();
    }

    componentWillUnmount() {
      this.off();
    }

    render() {
      return <Wrapped {...this.props} {...this.state} />;
    }

  };
}
