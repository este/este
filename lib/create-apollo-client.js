// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

const createApolloClient = (networkInterfaceUri: string) =>
  new ApolloClient({
    // $FlowFixMe
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      uri: networkInterfaceUri,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: 'same-origin',
      },
    }),
  });

export default createApolloClient;
