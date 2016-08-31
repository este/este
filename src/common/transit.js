/* @flow */
import { Record as ImmutableRecord, Seq } from 'immutable';
import invariant from 'invariant';
import transit from 'transit-immutable-js';

const records = {};

const transitRecords = () =>
  transit.withRecords(
    Seq(records).toSet().toArray()
  );

// Transit allows us to serialize / deserialize immutable Records automatically.
export const fromJSON = (string: string) => transitRecords().fromJSON(string);
export const toJSON = (object: any) => transitRecords().toJSON(object);

// TransitRecord is just a wrapper for the Record registering all Records.
// This is aspect-oriented programming. It's for cross-cutting concerns.
export const Record = (defaultValues: Object, name: string) => {
  invariant(name && typeof name === 'string',
    'Transit Record second argument name must be a non empty string.');
  // Hot reloading can register the already registered record, so override it.
  records[name] = ImmutableRecord(defaultValues, name);
  return records[name];
};
