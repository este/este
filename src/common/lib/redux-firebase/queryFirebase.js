// A higher order component for Firebase queries without on / off madness.

// Example:
// Users = queryFirebase(Users, props => ({
//   // Query path to listen. For one user we can use `users/${props.userId}`.
//   // We can postpone fetching: userId && `users/${props.userId}`
//   path: 'users',
//   // firebase.com/docs/web/api/query
//   params: [
//     ['orderByChild', 'authenticatedAt'],
//     ['limitToFirst', props.limitToFirst]
//   ],
//   on: {
//     value: (snapshot) => props.onUsersList(snapshot.val())
//     // value: [fn, onCustomError]
//     // all: onUser // All Firebase eventTypes.
//   }
// }));

// TODO: Granular updates sucks. Use Virtual DOM like diff for "value" update.
// The problem is, that detached collection is hard to update without "value".

import * as actions from './actions';
import Component from 'react-pure-render/component';
import Firebase from 'firebase';
import React, { PropTypes } from 'react';
import invariant from 'invariant';

const onError = error => console.log(error); // eslint-disable-line no-console
const ensureArrayWithDefaultOnError = item => {
  const array = [].concat(item);
  if (array.length === 1) array.push(onError);
  return array;
};
// Use key whenever you want to force off / on event registration. It's useful
// when queried component must be rerendered, for example when app state is
// recycled on logout. Then we can just set the key to current viewer.
const optionsToPayload = ({ path, key, params }) => ({ path, key, params });
const optionsToPayloadString = options => JSON.stringify(optionsToPayload(options));

let serverFetching = false;
let serverFetchingPromises = null;

export default function queryFirebase(Wrapped, mapPropsToOptions) {
  return class FirebaseQuery extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    // {eventType: fn} -> [['eventType', fn, onDefaultError]]
    // {eventType: [fn1, fn2]} -> [['eventType', fn1, fn2]]
    createArgs(eventTypes = {}) {
      // Make a shallow copy to prevent eventTypes argument modification.
      eventTypes = { ...eventTypes };
      // eventTypes.all is a shorthand for all granular Firebase events.
      // We can project all changes to immutable list with updateList helper.
      // But there is an issue with Firebase granular updates, detached
      // collection decays, and there is no way how to update it later, so it
      // must be reseted.
      if (eventTypes.all) {
        const action = eventTypes.all;
        delete eventTypes.all;
        if (serverFetching) {
          // On the server we have to fetch value once. We can't use 'on'
          // because we need promise to detect data are loaded.
          // There is no way how to fetch data once in the right order.
          // The snapshot.val() doesn't ensure the order, nor snapshot.forEach.
          // And we can't use on 'child_added' on the server.
          // Therefore the order must be enforced in the reducer.
          // TODO: I'm discussing this with Firebase support.
          eventTypes.value = (snapshot) => {
            const val = snapshot.val() || {};
            Object.keys(val).forEach(key => {
              action({
                eventType: 'child_added',
                key,
                value: val[key]
              });
            });
          };
        } else {
          ['child_added', 'child_changed', 'child_moved', 'child_removed']
            .forEach(eventType => {
              eventTypes[eventType] = (snapshot, prevChildKey) => action({
                eventType,
                key: snapshot.key(),
                prevChildKey,
                value: snapshot.val()
              });
            });
        }
      }
      // These ad hoc events doesn't make sense to listen them on the server.
      if (serverFetching) {
        delete eventTypes.child_changed;
        delete eventTypes.child_moved;
        delete eventTypes.child_removed;
      }
      return Object.keys(eventTypes).map(eventType => [
        eventType,
        ...ensureArrayWithDefaultOnError(eventTypes[eventType])
      ]);
    }

    dispatch(props, callback) {
      const options = mapPropsToOptions(props);
      // How to postpone query for not yet loaded property.
      // Example: { path: product && `products/${product.id}`, ... }
      if (!options.path) return;
      this.context.store.dispatch(({ firebase }) => {
        invariant(firebase instanceof Firebase,
          'Expected the firebase to be an instance of Firebase.');
        invariant(typeof options.path === 'string',
          'Expected the path to be a string.');
        const ref = firebase.child(options.path);
        return {
          type: callback(ref, options),
          payload: optionsToPayload(options)
        };
      });
    }

    on() {
      this.dispatch(this.props, (ref, { on, once, params = [] }) => {
        // Map declarative params to Firebase imperative API.
        params.forEach(([method, ...args]) => {
          ref = ref[method](...args);
        });
        // Map declarative on and once to Firebase imperative API.
        this.onArgs = this.createArgs(on);
        this.onArgs.forEach(arg => {
          if (serverFetching) {
            // Use 'once' on the server because 'on' doesn't make sense.
            serverFetchingPromises.push(ref.once(...arg));
          } else {
            ref.on(...arg);
          }
        });
        this.onceArgs = this.createArgs(once);
        this.onceArgs.forEach(arg => {
          if (serverFetching) {
            serverFetchingPromises.push(ref.once(...arg));
          } else {
            ref.once(...arg);
          }
        });
        return actions.REDUX_FIREBASE_ON_QUERY;
      });
    }

    off(props) {
      this.dispatch(props, ref => {
        // For deregistration, we have to use only eventType and callback.
        this.onArgs.forEach(arg => ref.off(arg[0], arg[1]));
        this.onceArgs.forEach(arg => ref.off(arg[0], arg[1]));
        return actions.REDUX_FIREBASE_OFF_QUERY;
      });
    }

    componentWillMount() {
      if (!serverFetching) return;
      this.on();
    }

    componentDidMount() {
      // Dispatch all handler without args to reset collection, because granular
      // events works only on fresh collections.
      const options = mapPropsToOptions(this.props);
      if (options.on && options.on.all) {
        options.on.all();
      }
      this.on();
    }

    componentDidUpdate(prevProps) {
      const prevOptions = optionsToPayloadString(mapPropsToOptions(prevProps));
      const options = optionsToPayloadString(mapPropsToOptions(this.props));
      // Detect only options change is must to avoid loops.
      if (prevOptions === options) return;
      this.off(prevProps);
      this.on();
    }

    componentWillUnmount() {
      this.off(this.props);
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}

// queryFirebaseServer is for server side data fetching. Example:
// await queryFirebaseServer(() => {
//   // Render app calls componentWillMount on every rendered component, so
//   // we don't have to rely on react-router routes. It's pretty fast, under
//   // 10ms generally, because view has no data yet.
//   renderApp(store, renderProps);
// });
// const html = renderPage(store, renderProps, req);
export const queryFirebaseServer = renderAppCallback => {
  serverFetching = true;
  serverFetchingPromises = [];
  try {
    renderAppCallback();
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  } finally {
    serverFetching = false;
    return Promise
      // Wait until all promises in an array are either rejected or fulfilled.
      // http://bluebirdjs.com/docs/api/reflect.html
      .all(serverFetchingPromises.map(promise => promise.reflect()));
  }
};
