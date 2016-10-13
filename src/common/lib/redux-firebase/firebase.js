/* @flow */
import * as actions from './actions';
import React from 'react';

// // Example
// OnlineUsers = firebase((database, props) => {
//   const usersPresenceRef = database.child('users-presence');
//   return [
//     [usersPresenceRef, 'on', 'value', props.onUsersPresence],
//   ]
// })(OnlineUsers);

type Query = [Object, string, string, Function, Function | void];
type onMount = (database: Object, props: Object) => void | Array<Query>;

// Higher order component for Firebase declarative queries.
const firebase = (onMount: onMount) => (WrappedComponent: Function) =>
  class Firebase extends React.Component {

    static contextTypes = {
      store: React.PropTypes.object, // Redux store.
      serverFetchPromises: React.PropTypes.array,
    };

    queries: Array<Query>;

    createAction(type) {
      const refs = this.queries.map(([ref]) => ref.toString());
      return { type, payload: { refs } };
    }

    componentWillMount() {
      const { serverFetchPromises } = this.context;
      if (!serverFetchPromises) return;
      // This is called only on the server.
      this.context.store.dispatch(({ firebase }) => {
        this.queries = onMount(firebase, this.props) || [];
        this.queries.forEach(([ref, , eventType, cb1, cb2]) => {
          // Enforce once eventType and store a promise so render can wait.
          const promise = ref.once(eventType, cb1, cb2);
          serverFetchPromises.push(promise);
        });
        return this.createAction(actions.FIREBASE_ON_QUERY);
      });
    }

    // This is called only on the client.
    componentDidMount() {
      this.context.store.dispatch(({ firebase }) => {
        this.queries = onMount(firebase, this.props) || [];
        this.queries.forEach(([ref, method, eventType, cb1, cb2]) => {
          ref[method](eventType, cb1, cb2);
        });
        return this.createAction(actions.FIREBASE_ON_QUERY);
      });
    }

    componentWillUnmount() {
      this.context.store.dispatch(() => {
        this.queries.forEach(([ref, method, eventType, cb1, cb2]) => {
          if (method === 'once') return;
          ref.off(eventType, cb1, cb2);
        });
        return this.createAction(actions.FIREBASE_OFF_QUERY);
      });
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  };

export default firebase;
