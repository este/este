export const SET_PERSISTENCE = 'SET_PERSISTENCE';
export const REMOVE_PERSISTENCE = 'REMOVE_PERSISTENCE';

export function set(key, value) {
  return ({persistenceStore}) => {
    persistenceStore.set(key, value);

    return {
      type: SET_PERSISTENCE,
      data: {key, value}
    };
  };
}

export function remove(key, value) {
  return ({persistenceStore}) => {
    persistenceStore.remove(key, value);

    return {
      type: REMOVE_PERSISTENCE,
      data: {key}
    };
  };
}
