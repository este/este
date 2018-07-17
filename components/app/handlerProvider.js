// @flow
import { ConnectionHandler } from 'relay-runtime';
import type { Handler } from 'react-relay';

type Handlers = { [string]: ?Handler };

// Handlers are superpowerful. They enforce client state and can be reused
// across all types. GraphQL directives at its best. But they are not 100%
// typed. JavaScript isn't Idris, yet :-)
// https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

// TODO: Factories and autoprefixes.

const handlers: Handlers = {
  draftText: {
    // update: createFooHandler('draftText', ({ record, value }) => {
    //   record.setValue(value.length, 'selectionStart')
    // })
    update: (store, payload) => {
      const record = store.get(payload.dataID);
      if (!record) return;
      let value = record.getValue(payload.fieldKey);
      if (typeof value !== 'string') value = '';
      record
        .setValue(value, 'draftText')
        .setValue(value.length, 'draftTextSelectionStart')
        .setValue(value.length, 'draftTextSelectionEnd');
    },
  },
  draftName: {
    update: (store, payload) => {
      const record = store.get(payload.dataID);
      if (!record) return;
      let value = record.getValue(payload.fieldKey);
      if (typeof value !== 'string') value = '';
      record.setValue(value, 'draftName');
    },
  },
};

const handlerProvider = (handle: string): Handler => {
  if (handle === 'connection') return ConnectionHandler;
  const handler = handlers[handle];
  if (handler != null) return handler;
  throw new Error(`handlerProvider: No handler provided for ${handle}`);
};

export default handlerProvider;
