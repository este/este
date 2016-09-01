/* @flow */
import { Record as ImmutableRecord, Seq } from 'immutable';
import invariant from 'invariant';
import transit from 'transit-immutable-js';

const records = {};

const transitRecords = () =>
  transit.withRecords(
    Seq(records).toSet().toArray()
  );

const fixForHotReload = (Record, previous) => {
  if (!previous) return;
  const names = Object.getOwnPropertyNames(previous);
  const transitGuidKey = names.find(n => n.startsWith('transit$guid$'));
  if (!transitGuidKey) return;
  Record[transitGuidKey] = previous[transitGuidKey];
};

// Transit allows us to serialize / deserialize immutable Records automatically.
export const fromJSON = (string: string) => transitRecords().fromJSON(string);
export const toJSON = (object: any) => transitRecords().toJSON(object);

// Just a wrapper for ImmutableRecord with registration for the transit.
// This is aspect-oriented programming. It's for cross-cutting concerns.
export const Record = (defaultValues: Object, name: string) => {
  invariant(name && typeof name === 'string',
    'Transit Record second argument name must be a non empty string.');
  const TransitImmutableRecord = ImmutableRecord(defaultValues, name);
  fixForHotReload(TransitImmutableRecord, records[name]);
  records[name] = TransitImmutableRecord;
  return TransitImmutableRecord;
};
