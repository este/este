import { List } from 'immutable';

export default function updateList(
  list,
  ItemRecord,
  idProp,
  args
) {
  // No args reset list because granular events can't update detached lists.
  if (!args) {
    return List();
  }

  const { eventType, key, prevChildKey, value } = args;
  const findIdx = id => list.findIndex(item => item[idProp] === id);
  // UpdateList check whether an operation is allowed since list can be stale.
  const currentIdx = findIdx(key);
  switch (eventType) {
    case 'child_removed':
      if (currentIdx === -1) return list;
      return list.delete(currentIdx);
    case 'child_changed':
      if (currentIdx === -1) return list;
      return list.splice(currentIdx, 1, list.get(currentIdx).merge(value));
    case 'child_moved':
      if (currentIdx === -1) return list;
      return list
        .delete(currentIdx)
        .insert(prevChildKey ? findIdx(prevChildKey) : 0, list.get(currentIdx));
    case 'child_added':
      if (currentIdx !== -1) list = list.delete(currentIdx);
      return list
        .insert(prevChildKey ? findIdx(prevChildKey) : 0, new ItemRecord(value));
  }
  return list;
}
