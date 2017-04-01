// @flow
import React from 'react';
import initReduxStore from './redux/init-store';

// import initApolloClient from './init-apollo-client';
// import initReduxStore from './init-redux-store';
// import { ApolloProvider, getDataFromTree } from 'react-apollo';

// Higher order component for data.
// github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux

type Props = {
  // isServer: boolean,
};

const withData = (Component: () => React.Element<*>) =>
  class extends React.Component {
    static async getInitialProps(/* ctx */) {
      initReduxStore({}, {});
      // const store = initReduxStore(client, client.initialState);
      // initReduxStore
      // Server props are passed to the client.
      const props = ({
        // isServer: true,
      }: Props);
      return props;
    }

    props: Props;

    // constructor(props: Props) {
    //   super(props);
    //   // console.log('constructor');
    //   // console.log(props);
    //   // this.store = initReduxStore(this.apolloClient, this.props.initialState);
    // }

    render() {
      return <Component {...this.props} />;
    }
  };

export default withData;

// Higher order component for data.
// github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux
// const withData = (Component: () => React.Element<*>) =>
//   class extends React.Component {
//     static async getInitialProps(ctx) {
//       const headers = ctx.req ? ctx.req.headers : {};
//       const client = initApolloClient(headers);
//       const store = initReduxStore(client, client.initialState);
//
//       const props = {
//         url: { pathname: ctx.pathname, query: ctx.query },
//         ...(await (Component.getInitialProps
//           ? Component.getInitialProps(ctx)
//           : {})),
//       };
//
//       if (!process.browser) {
//         const app = (
//           <ApolloProvider client={client} store={store}>
//             <Component {...props} />;
//           </ApolloProvider>
//         );
//         await getDataFromTree(app);
//       }
//
//       const state = store.getState();
//
//       return {
//         initialState: {
//           ...state,
//           apollo: {
//             data: client.getInitialState().data,
//           },
//         },
//         headers,
//         ...props,
//       };
//     }
//
//     apolloClient: any;
//     store: any;
//
//     constructor(props: any) {
//       super(props);
//       this.apolloClient = initApolloClient(
//         this.props.headers,
//         this.props.initialState
//       );
//       this.store = initReduxStore(this.apolloClient, this.props.initialState);
//     }
//
//     render() {
//       return (
//         <ApolloProvider client={this.apolloClient} store={this.store}>
//           <Component {...this.props} />
//         </ApolloProvider>
//       );
//     }
//   };
//
// export default withData;
