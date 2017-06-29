// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

const createApolloClient = () =>
  new ApolloClient({
    // $FlowFixMe property `browser` not found in Process
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      uri: GRAPHQL_ENDPOINT,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: 'same-origin',
      },
    }),
  });

export default createApolloClient;
