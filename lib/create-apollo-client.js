// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_ENDPOINT,
  opts: {
    // Additional fetch() options like `credentials` or `headers`
    credentials: 'same-origin',
  },
});

// TODO: Handle errors. Probably pass Redux store to createApolloClient.
// https://github.com/apollographql/apollo-client/issues/657#issuecomment-311741541
const createApolloClient = () =>
  new ApolloClient({
    // $FlowFixMe property `browser` not found in Process
    ssrMode: !process.browser,
    networkInterface,
  });

export default createApolloClient;
