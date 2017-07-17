// @flow
import 'isomorphic-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const createRelayEnvironment = () => {
  const store = new Store(new RecordSource());
  const network = Network.create((operation, variables) =>
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
