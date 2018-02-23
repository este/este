// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import type { Environment } from 'react-relay';

// RelayProvider sets Relay context manually for SSR and pending navigations.
// Check App.getInitialProps, note "await fetchQuery". It replaces QueryRenderer.
// https://github.com/robrichard/relay-context-provider

type Props = {
  environment: Environment,
  variables: Object,
  children: React.Node,
};

class RelayProvider extends React.PureComponent<Props> {
  static childContextTypes = {
    relay: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.variables,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

export default RelayProvider;
