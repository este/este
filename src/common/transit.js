import immutable from 'immutable';
import invariant from 'invariant';
import transit from 'transit-immutable-js';

const records = [];

// Transit allows us to serialize / deserialize immutable Records automatically.
export const fromJSON = string => transit.withRecords(records).fromJSON(string);
export const toJSON = object => transit.withRecords(records).toJSON(object);

// Record is just a wrapper for immutable.Record registering all Records.
// This is aspect-oriented programming. It's for cross-cutting concerns.
export const Record = (defaultValues, name) => {
  invariant(name && typeof name === 'string',
    'Transit Record second argument name must be a non empty string.');
  const ImmutableRecord = immutable.Record(defaultValues, name);
  records.push(ImmutableRecord);
  return ImmutableRecord;
};
