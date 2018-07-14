// @flow
import * as React from 'react';
import { commitLocalUpdate } from 'relay-runtime';
import type { Environment, StoreUpdater } from 'react-relay';
import EnvironmentContext from './EnvironmentContext';

export type Store = StoreUpdater => void;

const withStore = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { store: Store | void }>> => {
  type WithStoreProps = {
    ...Props,
    forwardedRef: Object,
    environment: Environment,
  };

  class WithStore extends React.PureComponent<WithStoreProps> {
    store = (storeUpdater: StoreUpdater) => {
      commitLocalUpdate(this.props.environment, storeUpdater);
    };

    render() {
      const { forwardedRef, environment, ...rest } = this.props;
      return <Component {...rest} store={this.store} ref={forwardedRef} />;
    }
  }

  // $FlowFixMe React.forwardRef is not typed yet.
  return React.forwardRef((props, ref) => {
    return (
      <EnvironmentContext.Consumer>
        {environment => (
          <WithStore {...props} forwardedRef={ref} environment={environment} />
        )}
      </EnvironmentContext.Consumer>
    );
  });
};

export default withStore;
