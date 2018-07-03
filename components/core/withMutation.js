// @flow
import * as React from 'react';
import {
  commitMutation,
  type Disposable,
  type Environment,
  type GraphQLTaggedNode,
  type RecordSourceSelectorProxy,
  type RelayMutationConfig,
} from 'react-relay';
import ErrorContext, { type DispatchError } from './ErrorContext';
import EnvironmentContext from './EnvironmentContext';

// Note Input instead of Variables. It keeps withMutation component simple.
export type Commit<Input, Response> = (
  input: Input,
  onCompleted?: (Response) => void,
) => void;

export type Errors<Response, Name: string> = $ElementType<
  // Mutation payload must be nullable, because resolver can fail.
  // Therefore, Relay compiler generates maybe type. That's correct.
  // But for Commit and Errors generic types we need non maybe type.
  $NonMaybeType<$ElementType<Response, Name>>,
  'errors',
>;

const withMutation = <Props: {}, Input: Object, Response>(
  Component: React.ComponentType<Props>,
  mutation: GraphQLTaggedNode,
  config?: {|
    optimisticResponse?: Object,
    optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
    updater?: ?(store: RecordSourceSelectorProxy) => void,
    configs?: Array<RelayMutationConfig>,
  |},
): React.ComponentType<
  $Diff<
    Props,
    {
      commit: Commit<Input, Response> | void,
      pending: boolean | void,
    },
  >,
> => {
  type MutationProps = {
    ...Props,
    dispatchError: DispatchError,
    environment: Environment,
  };

  type MutationState = {|
    pending: boolean,
  |};

  class WithMutation extends React.PureComponent<MutationProps, MutationState> {
    disposables: Array<Disposable> = [];

    disposed = false;

    state = {
      pending: false,
    };

    componentWillUnmount() {
      this.disposables.forEach(disposable => disposable.dispose());
      this.disposed = true;
    }

    commit: Commit<Input, Response> = (input, onCompleted) => {
      if (this.disposed) return;
      // Note, we can't read from this.state.pending because setState is async.
      // Therefore, "if (this.state.pending) return" can't help.
      // Using pending for disabled state is good enough.
      this.setState({ pending: true });
      // https://facebook.github.io/relay/docs/en/mutations.html#commitmutation
      const disposable = commitMutation(this.props.environment, {
        ...config,
        mutation,
        variables: { input },
        onCompleted: (response, errors) => {
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
