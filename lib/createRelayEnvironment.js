// @flow
import 'isomorphic-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const createRelayEnvironment = (
  { records = {} }: {| records?: Object |} = {},
) => {
  const store = new Store(new RecordSource(records));
  const network = Network.create((operation, variables) =>
    // eslint-disable-next-line no-undef
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        // Imho nepotrebuju. Accept: 'application/json',
        'Content-Type': 'application/json',
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
