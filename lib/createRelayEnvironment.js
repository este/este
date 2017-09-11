// @flow
import 'isomorphic-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const createRelayEnvironment = (token: ?string, records: Object = {}) => {
  const store = new Store(new RecordSource(records));
  const network = Network.create((operation, variables) =>
    // TODO: Consider RelayQueryResponseCache
    // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
    // eslint-disable-next-line no-undef
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token != null ? { authorization: `Bearer ${token}` } : null),
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json()),
  );
  return new Environment({ store, network });
};

export default createRelayEnvironment;
