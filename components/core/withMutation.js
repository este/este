// @flow
import * as React from 'react';
import {
  commitMutation,
  type Disposable,
  type Environment,
  type GraphQLTaggedNode,
  type SelectorStoreUpdater,
  type RelayMutationConfig,
} from 'react-relay';
import ErrorContext, { type DispatchError } from './ErrorContext';
import EnvironmentContext from './EnvironmentContext';

type Input<Mutation> = $ElementType<
  $ElementType<Mutation, 'variables'>,
  'input',
>;

type Response<Mutation> = $ElementType<Mutation, 'response'>;

export type Commit<Mutation> = (
  input: Input<Mutation>,
  onCompleted?: (response: Response<Mutation>) => void,
) => void;

export type Errors<Mutation, Name: string> = $ElementType<
  // $NonMaybeType, to get 'errors' on by default nullable name type.
  $NonMaybeType<$ElementType<Response<Mutation>, Name>>,
  'errors',
>;

// Note this is subset of flow-typed react-relay MutationConfig type.
type Config = {|
  mutation: GraphQLTaggedNode,
  configs?: Array<RelayMutationConfig>,
  optimisticUpdater?: ?SelectorStoreUpdater,
  optimisticResponse?: Object,
  updater?: ?SelectorStoreUpdater,
|};

const withMutation = (config: Config) => <
  Props: {},
  Mutation: {|
    variables: {| input: Object |},
    response: Object,
  |},
>(
  Component: React.ComponentType<Props>,
): React.ComponentType<
  $Diff<
    Props,
    {
      commit: Commit<Mutation> | void,
      pending: boolean | void,
    },
  >,
> => {
  type WithMutationProps = {
    ...Props,
    dispatchError: DispatchError,
    environment: Environment,
  };

  type WithMutationState = {|
    pending: boolean,
  |};

  class WithMutation extends React.PureComponent<
    WithMutationProps,
    WithMutationState,
  > {
    disposables: Array<Disposable> = [];

    disposed = false;

    state = {
      pending: false,
    };

    componentWillUnmount() {
      this.disposables.forEach(disposable => disposable.dispose());
      this.disposed = true;
    }

    commit: Commit<Mutation> = (input, onCompleted) => {
      if (this.disposed) return;
      // Note, we can't read from this.state.pending because setState is async.
      // Therefore, "if (this.state.pending) return" can't help.
      // Using pending for disabled state is good enough.
      this.setState({ pending: true });
      // https://facebook.github.io/relay/docs/en/mutations.html#commitmutation
      const disposable = commitMutation(this.props.environment, {
        ...config,
        variables: { input },
        onCompleted: (response: Response<Mutation>, errors) => {
          this.setState({ pending: false });
          if (errors) errors.forEach(error => this.props.dispatchError(error));
          if (onCompleted) onCompleted(response);
        },
        onError: error => {
          this.setState({ pending: false });
          this.props.dispatchError(error);
        },
      });
      this.disposables.push(disposable);
    };

    render() {
      // Do not pass WithMutation props to Component.
      const { dispatchError, environment, ...props } = this.props;
      return (
        <Component
          {...props}
          commit={this.commit}
          pending={this.state.pending}
        />
      );
    }
  }

  // Inject dispatchError and environment as props so this.commit can get them.
  // https://twitter.com/estejs/status/997984391392526341
  // https://reactjs.org/docs/context.html#accessing-context-in-lifecycle-methods
  return props => (
    <ErrorContext.Consumer>
      {({ dispatchError }) => (
        <EnvironmentContext.Consumer>
          {environment => (
            <WithMutation
              {...props}
              dispatchError={dispatchError}
              environment={environment}
            />
          )}
        </EnvironmentContext.Consumer>
      )}
    </ErrorContext.Consumer>
  );
};

export default withMutation;
