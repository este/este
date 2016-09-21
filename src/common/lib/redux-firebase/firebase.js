/* @flow */
import * as actions from './actions';
import React from 'react';

// TODO: Add server side rendering.
// // Example
// OnlineUsers = firebase((database, props) => {
//   const usersPresenceRef = database.child('users-presence');
//   return [
//     [usersPresenceRef, 'on', 'value', props.onUsersPresence],
//   ]
// })(OnlineUsers);

type Query = [Object, string, string, Function, Function];
type onDidMount = (
  database: Object,
  props: Object
) => void | Array<Query>;

// Higher order component for Firebase declarative queries.
const firebase = (onDidMount: onDidMount) => (WrappedComponent: Function) =>
  class Firebase extends React.Component {

    static contextTypes = {
      store: React.PropTypes.object, // Redux store.
    };

    queries: Array<Query>;

    createAction(type) {
      const refs = this.queries.map(([ref]) => ref.toString());
      return { type, payload: { refs } };
    }

    componentDidMount() {
      this.context.store.dispatch(({ firebase }) => {
        this.queries = onDidMount(firebase, this.props) || [];
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
