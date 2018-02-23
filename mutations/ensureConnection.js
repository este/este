// @flow

// This is DX helper. I hope Relay fix itself soon.
// https://github.com/facebook/relay/issues/1808#issuecomment-304519883
// https://github.com/facebook/relay/issues/2344
const ensureConnection = (connection: Object) => {
  if (connection) return;
  throw new Error('Undefined connection. Check getConnection arguments.');
};

export default ensureConnection;
