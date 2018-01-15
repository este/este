// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

// RelayProvider sets Relay context manually for SSR and pending navigations.
// Check app.js, note "await fetchQuery". It replaces QueryRenderer.
// This is a hack. I hope Relay will provide an official API soon.
// https://github.com/robrichard/relay-context-provider

type Props = {
  children: React.Node,
  environment: Object,
  variables: Object,
};

class RelayProvider extends React.PureComponent<Props> {
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

RelayProvider.childContextTypes = {
  relay: PropTypes.object.isRequired,
};

RelayProvider.propTypes = {
  environment: PropTypes.object.isRequired,
  variables: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default RelayProvider;
