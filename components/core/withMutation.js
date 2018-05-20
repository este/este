// @flow
import * as React from 'react';
import {
  commitMutation,
  type Environment,
  type GraphQLTaggedNode,
  type RecordSourceSelectorProxy,
  type SelectorData,
  type RelayMutationConfig,
} from 'react-relay';
import ErrorContext, { type DispatchError } from './ErrorContext';
import EnvironmentContext from '../core/EnvironmentContext';

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
  config?: {
    optimisticResponse?: Object,
    optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
    updater?: ?(store: RecordSourceSelectorProxy) => void,
    configs?: Array<RelayMutationConfig>,
  },
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

  class Mutation extends React.PureComponent<MutationProps> {
    commit: Commit<Input, Response> = (input, onCompleted) => {
      // TODO: Set pending to true.
      // https://facebook.github.io/relay/docs/en/mutations.html#commitmutation
      const disposable = commitMutation(this.props.environment, {
        ...config,
        mutation,
        variables: { input },
        onCompleted: (response, errors) => {
          // TODO: Set pending to false.
          if (errors) errors.forEach(error => this.props.dispatchError(error));
          if (onCompleted) onCompleted(response);
        },
        onError: error => {
          // TODO: Set pending to false.
          // dispatchError(error)
          // console.log('onError');
          // console.log(error);
        },
      });
    };

    render() {
      // Filter Mutation props.
      const { dispatchError, environment, ...props } = this.props;
      return <Component {...props} commit={this.commit} pending={false} />;
    }
  }

  // Inject dispatchError and environment as props so this.commit can get them.
  // Previous pattern commit={this.createCommit(...)} considered harmfull.
  // https://reactjs.org/docs/context.html#accessing-context-in-lifecycle-methods
  return props => (
    <ErrorContext.Consumer>
      {({ dispatchError }) => (
        <EnvironmentContext.Consumer>
          {environment => (
            <Mutation
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
