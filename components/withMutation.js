// @flow
import * as React from 'react';
import type { Commit } from '../mutations/types';
import PropTypes from 'prop-types';
import { mutationErrorToAppError } from '../lib/appError';
import type { Disposable, Environment } from 'react-relay';
import AppErrorContext from './AppErrorContext';

// TODO: Use create-react-context.

// https://github.com/facebook/relay/issues/2077
export const getClientMutationId = () => Date.now().toString(36);

type OnCompleted<Response> = (response: Response) => void;

type OnError = (error: any) => void | boolean;

type Mutate = <Variables, Response>(
  commit: Commit<Variables, Response>,
  variables: Variables,
  onCompleted: OnCompleted<Response>,
  onError: OnError,
) => Disposable;

const withMutation = <Props: {}>(
  Component: React.ComponentType<{ mutate: Mutate } & Props>,
): React.ComponentType<Props> =>
  class WithMutation extends React.Component<Props> {
    static contextTypes = {
      relay: PropTypes.object,
    };

    static handleError(error, onError, dispatchAppError) {
      const handled = onError(error);
      if (handled === true) return;
      const appError = mutationErrorToAppError(error);
      dispatchAppError(appError);
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    // We have to track _isMounted, because Relay doesn't support unsubscribe.
    // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
    // TODO: Use Disposable dispose from commit. Probably stored in an array.
    _isMounted: boolean;

    context: {
      relay: { environment: Environment },
    };

    // We can't reuse Mutate type here.
    // https://twitter.com/calebmer/status/906561429129502720
    mutate = (dispatchAppError: *) => <Variables, Response>(
      commit: Commit<Variables, Response>,
      variables: Variables,
      onCompleted: OnCompleted<Response>,
      onError: OnError,
    ) =>
      commit(
        this.context.relay.environment,
        variables,
        (response, payloadError) => {
          if (!this._isMounted) return;
          if (payloadError) {
            WithMutation.handleError(payloadError, onError, dispatchAppError);
            return;
          }
          onCompleted(response);
        },
        error => {
          if (!this._isMounted) return;
          WithMutation.handleError(error, onError, dispatchAppError);
        },
      );

    render() {
      return (
        <AppErrorContext.Consumer>
          {({ dispatchAppError }) => (
            <Component {...this.props} mutate={this.mutate(dispatchAppError)} />
          )}
        </AppErrorContext.Consumer>
      );
    }
  };

export default withMutation;
