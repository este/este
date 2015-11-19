export const PERSISTENCE_SET = 'PERSISTENCE_SET';
export const PERSISTENCE_REMOVE = 'PERSISTENCE_REMOVE';

export function set(key, value) {
  return ({persistenceStore}) => {
    persistenceStore.set(key, value);

    return {
      type: PERSISTENCE_SET,
      data: {key, value}
    };
  };
}

export function remove(key, value) {
  return ({persistenceStore}) => {
    persistenceStore.remove(key, value);

    return {
      type: PERSISTENCE_REMOVE,
      data: {key}
    };
  };
}
