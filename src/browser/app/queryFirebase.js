// @flow
import type { Action } from '../../common/types';
import isClient from '../../common/app/isClient';

// LRU (Least Recently Used) cached Firebase queries for the best UX.
// Queries are lazily watched when a route is matched, but not unwatched when
// route is left. This makes UI super snappy and always fresh.
// Queries are unwatched when the limit for concurrent queries is hit.
// Server side rendering with data fetching is supported.

type Ref = Object;
type Snap = Object;
type ActionCreator = (snap: Snap, params: Object) => Action;

type EventType =
  | 'value'
  | 'child_added'
  | 'child_changed'
  | 'child_removed'
  | 'child_moved';

type CreateRef = (ref: Ref, params: Object) => [Ref, EventType, ActionCreator];

type CachedRef = {
  ref: Ref,
  eventType: EventType,
  successCallback: Function,
};

type OnMatchArg = {
  context: { store: Object },
  params: Object,
};

const LRU_LIMIT_AKA_MAX_CONNECTIONS = 100;

let refs: CachedRef[] = [];

const queryFirebase = (...createRefs: CreateRef[]) =>
  ({ context: { store }, params }: OnMatchArg): Promise<any> => {
    const promises = createRefs.map(
      createRef =>
        new Promise((resolve, reject) => {
          store.dispatch(({ firebase }) => {
            const [ref, eventType, action] = createRef(firebase, params);
            const successCallback = (snap: Snap) => {
              store.dispatch(action(snap, params));
              resolve(null);
            };
            if (isClient) {
              const cachedRefIndex = refs.findIndex(item =>
                item.ref.isEqual(ref));
              const cachedRef = refs[cachedRefIndex];
              if (cachedRef) {
                // LRU, move visited ref to the array end.
                refs.splice(cachedRefIndex, 1);
                refs.push(cachedRef);
                resolve(null);
              } else {
                refs.push({ ref, eventType, successCallback });
                // LRU, remove the first when the limit is hit.
                if (refs.length > LRU_LIMIT_AKA_MAX_CONNECTIONS) {
                  const firstRef = refs.shift();
                  firstRef.ref.off(
                    firstRef.eventType,
                    firstRef.successCallback,
                  );
                }
                ref.on(eventType, successCallback, error => {
                  refs = refs.filter(item => !item.ref.isEqual(ref));
                  reject(error);
                });
                // Don't wait before the initial rendering.
                // We can't skip the initial data fetching because we have to watch
                // Firebase endpoints anyway, but we don't have to wait for them.
                // This ensures client and server HTML match.
                if (!store.getState().app.started) {
                  resolve(null);
                }
              }
            } else {
              ref.once(eventType, successCallback, reject);
            }
            return ({
              type: 'QUERY_FIREBASE',
              payload: { ref: ref.toString() },
            }: Action);
          });
        }),
    );
    return Promise.all(promises);
  };

export default queryFirebase;
