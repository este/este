// @flow

// It's defined somewhere, I don't know exactly where. Backend? Relay?
export const clientRoot = 'client:root';

// This is DX helper. I hope Relay fix itself soon.
// https://github.com/facebook/relay/issues/1808#issuecomment-304519883
// https://github.com/facebook/relay/issues/2344
export const ensureConnection = (connection: Object) => {
  if (connection) return;
  throw new Error('Undefined connection. Check getConnection arguments.');
};
