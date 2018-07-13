// @flow
import * as React from 'react';
import { commitLocalUpdate } from 'relay-runtime';
import type { Environment, StoreUpdater } from 'react-relay';
import EnvironmentContext from './EnvironmentContext';

export type ClientCommit = StoreUpdater => void;

const withClientMutation = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { clientCommit: ClientCommit | void }>> => {
  type WithClientMutationProps = {
    ...Props,
    forwardedRef: Object,
    environment: Environment,
  };

  class WithClientMutation extends React.PureComponent<
    WithClientMutationProps,
  > {
    clientCommit = (storeUpdater: StoreUpdater) => {
      commitLocalUpdate(this.props.environment, storeUpdater);
    };

    render() {
      const { forwardedRef, environment, ...rest } = this.props;
      return (
        <Component
          {...rest}
          clientCommit={this.clientCommit}
          ref={forwardedRef}
        />
      );
    }
  }

  // $FlowFixMe React.forwardRef is not typed yet.
  return React.forwardRef((props, ref) => {
    return (
      <EnvironmentContext.Consumer>
        {environment => (
          <WithClientMutation
            {...props}
            forwardedRef={ref}
            environment={environment}
          />
        )}
      </EnvironmentContext.Consumer>
    );
  });
};

export default withClientMutation;
