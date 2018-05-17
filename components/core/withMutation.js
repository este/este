// @flow
import * as React from 'react';
import {
  commitMutation,
  type GraphQLTaggedNode,
  type RecordSourceSelectorProxy,
  type SelectorData,
  type RelayMutationConfig,
} from 'react-relay';
// import { type Errors } from '../../server/error';
import ErrorContext from './ErrorContext';
import EnvironmentContext from '../core/EnvironmentContext';

export type Commit<Input: Object, Response> = (
  input: Input,
  onCompleted?: (response: Response) => void,
) => void;

export type Errors<Response, Name: string> = $ElementType<
  // Mutation payload must be nullable, because resolver can throw Error.
  // Therefore, Relay compiler generates maybe type. That's correct.
  // But for Commit and Errors generic types we need non maybe type.
  // $NonMaybeType saved my day.
  $NonMaybeType<$ElementType<Response, Name>>,
  'errors',
>;

const withMutation = <Props: Object, Input: Object, Response>(
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
  class Mutation extends React.PureComponent<Props> {
    createCommit = (dispatchError, environment) => {
      const commit: Commit<Input, Response> = (input, onCompleted) => {
        // TODO: Set pending to true.
        // https://facebook.github.io/relay/docs/en/mutations.html#commitmutation
        const disposable = commitMutation(environment, {
          ...config,
          mutation,
          variables: { input },
          onCompleted(response, errors) {
            if (errors) errors.forEach(error => dispatchError(error));
            // response do onCompleted
            // pending vypnout
            // error taky pending vypnout
            // a to je imho cele
            // co ten error?

            // nacist nejak?
            console.log('onCompleted');
            // // null, a pole locations a message
            console.log(response);
            console.log(errors);
            // TODO: Set pending to false.
            // if (onCompleted) onCompleted(response);
            // TODO: Errors.
            // if (errors)
          },
          onError(error) {
            // console.log('onError');
            // console.log(error);
          },
        });
      };
      return commit;
    };

    render() {
      return (
        <ErrorContext.Consumer>
          {({ dispatchError }) => (
            <EnvironmentContext.Consumer>
              {environment => (
                <Component
                  {...this.props}
                  commit={this.createCommit(dispatchError, environment)}
                  pending={false}
                />
              )}
            </EnvironmentContext.Consumer>
          )}
        </ErrorContext.Consumer>
      );
    }
  }

  return Mutation;
};

export default withMutation;
