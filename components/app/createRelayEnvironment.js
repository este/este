// @flow
/* global fetch:false */
import 'isomorphic-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// This is how we read values from process.env.
// Fail as soon as possible, aka when module is loaded.
// No helper lib etc. Just this. Flow will tell you.
// https://github.com/zeit/next.js/tree/canary/examples/with-dotenv#the-idea-behind-the-example
const appGraphqlEndpoint = process.env.APP_GRAPHQL_ENDPOINT;
if (appGraphqlEndpoint == null)
  throw new Error('Missing process.env.APP_GRAPHQL_ENDPOINT');

const createRelayEnvironment = (token: ?string, records: Object = {}) => {
  const store = new Store(new RecordSource(records));
  const network = Network.create((operation, variables) =>
    fetch(appGraphqlEndpoint, {
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
