// Helper for updating immutable List by all Firebase events.

import { List } from 'immutable';

export default function updateList(
  list,
  ItemRecord,
  idProp,
  args
) {
  const { eventType, key, prevChildKey, val } = args;
  const findIndex = id => list.findIndex(item => item[idProp] === id);
  const getInsertIndex = () => prevChildKey ? findIndex(prevChildKey) + 1 : 0;
  // TODO: Firebase ensures consistency, so maybe we don't need if checks with
  // once value approach.
  switch (eventType) {
    case 'child_added': {
      const index = findIndex(key);
      if (index !== -1) return list;
      return list.insert(getInsertIndex(), new ItemRecord(val));
    }
    case 'child_changed': {
      const index = findIndex(key);
      if (index === -1) return list;
      return list.splice(index, 1, list.get(index).merge(val));
    }
    case 'child_moved': {
      const index = findIndex(key);
      if (index === -1) return list;
      return list.delete(index).insert(getInsertIndex(), list.get(index));
    }
    case 'child_removed': {
      const index = findIndex(key);
      if (index === -1) return list;
      return list.delete(index);
    }
    case 'value': {
      return List(val).map(item => new ItemRecord(item));
    }
  }
  return list;
}
