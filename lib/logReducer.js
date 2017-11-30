// @flow

// Existential type to the rescue.
// https://flow.org/en/docs/types/utilities/#toc-existential-type

const logReducer =
  process.env.NODE_ENV === 'production'
    ? (reducer: *) => reducer
    : (reducer: *) => (prevState: *, action: *) => {
        /* eslint-disable no-console */
        console.groupCollapsed(`action ${action.type}`);
        console.log('prev state', prevState);
        console.log('action', action);
        const nextState = reducer(prevState, action);
        console.log('next state', nextState);
        console.groupEnd();
        return nextState;
        /* eslint-enable no-console */
      };

export default logReducer;
