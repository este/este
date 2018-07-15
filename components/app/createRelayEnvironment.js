// @flow
/* global fetch:false */
import 'isomorphic-fetch';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  ConnectionHandler,
} from 'relay-runtime';
import type { Handler } from 'react-relay';

export type CreateRelayEnvironmentOptions = {
  token: ?string,
  records?: ?Object,
  // We have to reject errors manually, because of fetchQuery design.
  // https://github.com/facebook/relay/issues/1816#issuecomment-309760368
  rejectErrors?: boolean,
};

const createNetwork = (token, rejectErrors) =>
  Network.create((operation, variables) =>
    fetch(process.env.API_ENDPOINT || '', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token != null ? { authorization: `Bearer ${token}` } : null),
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (rejectErrors === true && json.errors) {
          // [{"message":"Not Authorised!" is returned by server/api/permissions
          return Promise.reject(json.errors);
        }
        return json;
      }),
  );

// TODO: Figure out where handlers belong. Own file?
const DraftTextHandler: Handler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    if (!record) return;
    let value = record.getValue(payload.fieldKey);
    if (typeof value !== 'string') value = '';
    record
      .setValue(value, 'draftText')
      .setValue(value.length, 'selectionStart')
      .setValue(value.length, 'selectionEnd');
  },
};

const handlerProvider = handle => {
  switch (handle) {
    case 'connection':
      return ConnectionHandler;
    case 'draftText':
      return DraftTextHandler;
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`);
};

const createRelayEnvironment = (options: CreateRelayEnvironmentOptions) => {
  const { token, records, rejectErrors } = options;
  const store = new Store(new RecordSource(records));
  const network = createNetwork(token, rejectErrors);
  return new Environment({ store, network, handlerProvider });
};

export default createRelayEnvironment;
