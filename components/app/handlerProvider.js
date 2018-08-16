// @flow
import { ConnectionHandler } from 'relay-runtime';
import type { Handler } from 'react-relay';

type Handlers = { [string]: ?Handler };

// https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

const handlers: Handlers = {
  // Makes 'draftFoo' for any 'foo' field with an initial value.
  // Sure we can memoize at the component level by keeping value in a state, but
  // that's verbose. Handler 'draft' does that globally.
  // Example:
  // foo @__clientField(handle: "draft")
  // draftFoo
  draft: {
    update: (store, payload) => {
      const record = store.get(payload.dataID);
      if (!record) return;
      const { fieldKey } = payload;
      let value = record.getValue(fieldKey);
      if (typeof value !== 'string') value = '';
      const FieldKey = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
      const draftKey = `draft${FieldKey}`;
      record.setValue(value, draftKey);
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
