// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import type { Environment } from 'react-relay';
import { withRouter } from 'next/router';

// RelayProvider sets Relay context manually for SSR and pending navigations.
// Check App.getInitialProps, note "await fetchQuery". It replaces QueryRenderer.
// https://github.com/robrichard/relay-context-provider
// TODO: Recheck with every new Relay release.

type RelayProviderProps = {|
  environment: Environment,
  children: React.Node,
  router: {|
    query: Object,
  |},
|};

class RelayProvider extends React.PureComponent<RelayProviderProps> {
  static childContextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    relay: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.relayContext = {
      environment: this.props.environment,
      variables: this.props.router.query,
    };
  }

  getChildContext() {
    return {
      relay: this.relayContext,
    };
  }

  componentWillReceiveProps(nextProps) {
    // https://github.com/facebook/relay/issues/2429#issuecomment-391808755
    Object.assign(this.relayContext, {
      environment: nextProps.environment,
      variables: nextProps.router.query,
    });
  }

  relayContext: {|
    environment: Environment,
    variables: Object,
  |};

  render() {
    return this.props.children;
  }
}

export default withRouter(RelayProvider);
