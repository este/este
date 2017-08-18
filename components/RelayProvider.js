// @flow
import React, { type Element } from 'react';
import PropTypes from 'prop-types';

// Thank you https://github.com/robrichard
// https://github.com/robrichard/relay-context-provider

type Props = {
  children: Element<any>,
  environment: Object,
  variables: Object,
};

class RelayProvider extends React.Component<Props> {
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
