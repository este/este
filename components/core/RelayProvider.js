// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import type { Environment } from 'react-relay';
import { withRouter } from 'next/router';

// RelayProvider sets Relay context manually for SSR and pending navigations.
// Check App.getInitialProps, note "await fetchQuery". It replaces QueryRenderer.
// https://github.com/robrichard/relay-context-provider
// TODO: This is temp hack. Can't be updated for a new React context.

type RelayProviderProps = {
  environment: Environment,
  children: React.Node,
  router: {
    query: Object,
  },
};

class RelayProvider extends React.PureComponent<RelayProviderProps> {
  static childContextTypes = {
    relay: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.router.query,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(RelayProvider);
