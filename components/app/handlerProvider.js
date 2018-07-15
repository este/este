// @flow
import { ConnectionHandler } from 'relay-runtime';
import type { Handler } from 'react-relay';

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

const handlerProvider = (handle: string) => {
  switch (handle) {
    case 'connection':
      return ConnectionHandler;
    case 'draftText':
      return DraftTextHandler;
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`);
};

export default handlerProvider;
