// @flow
import 'isomorphic-fetch'; // Apollo needs it.
import { ApolloClient, createNetworkInterface } from 'react-apollo';

const createApolloClient = (
  networkInterfaceUri: string,
  headers: Object,
  initialState: Object
) =>
  new ApolloClient({
    initialState,
    // $FlowFixMe
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: networkInterfaceUri,
      opts: {
        credentials: 'same-origin',
        // Pass headers here if your graphql server requires them
      },
    }),
  });

export default createApolloClient;
