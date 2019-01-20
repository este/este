import PropTypes from 'prop-types';
import React from 'react';
import { Environment } from 'relay-runtime';

// RelayProvider sets Relay context manually for SSR and pending navigations.
// Check App.getInitialProps, note "await fetchQuery". It replaces QueryRenderer.
// https://github.com/robrichard/relay-context-provider
// TODO: Recheck with every new Relay release.

interface RelayProviderFixProps {
  environment: Environment;
  variables: object;
  children: React.ReactNode;
}

interface RelayProviderFixContext {
  environment: Environment;
  variables: object;
}

class RelayProviderFix extends React.PureComponent<RelayProviderFixProps> {
  static childContextTypes = {
    relay: PropTypes.object.isRequired,
  };

  relayContext: RelayProviderFixContext;

  constructor(props: RelayProviderFixProps, context: RelayProviderFixContext) {
    super(props, context);
    this.relayContext = {
      environment: this.props.environment,
      variables: this.props.variables,
    };
  }

  getChildContext() {
    return {
      relay: this.relayContext,
    };
  }

  componentWillReceiveProps(nextProps: RelayProviderFixProps) {
    // https://github.com/facebook/relay/issues/2429#issuecomment-391808755
    Object.assign(this.relayContext, {
      environment: nextProps.environment,
      variables: nextProps.variables,
    });
  }

  render() {
    return this.props.children;
  }
}

export default RelayProviderFix;
