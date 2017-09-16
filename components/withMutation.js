// @flow
import React, { type ComponentType } from 'react';
import type { Commit, Environment, Store } from '../types';
import PropTypes from 'prop-types';
import { maybeMutationErrorToAppError } from '../lib/appError';

// https://github.com/facebook/relay/issues/2077
export const getClientMutationId = () => Date.now().toString(36);

type Mutate = <Variables, Response>(
  commit: Commit<Variables, Response>,
  variables: Variables,
  onCompleted: (response: Response) => void,
  onError: (error: any) => void,
) => void;

const withMutation = <Props: {}>(
  Component: ComponentType<{ mutate: Mutate } & Props>,
): ComponentType<Props> =>
  class WrapperComponent extends React.Component<Props> {
    static contextTypes = {
      relay: PropTypes.object,
      store: PropTypes.object,
    };

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    // We have to track _isMounted, because Relay doesn't support unsubscribe.
    // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
    _isMounted: boolean;

    context: {
      relay: { environment: Environment },
      store: Store,
    };

    handleError(error, onError) {
      // Some errors are innocent and expected. For example, wrongPassword.
      // Such errors should be handled in a component.
      // Some errors are serious and global. For example, failedToFetch.
      // Such errors should be handled in AppError component.
      const appError = maybeMutationErrorToAppError(error);
      if (appError) this.context.store.dispatch(appError);
      onError(error);
    }

    // We probably can't reuse Mutate type here.
    // https://twitter.com/calebmer/status/906561429129502720
    mutate = <Variables, Response>(
      commit: Commit<Variables, Response>,
      variables: Variables,
      onCompleted: (response: Response) => void,
      onError: (error: any) => void,
    ) =>
      commit(
        this.context.relay.environment,
        variables,
        (response, payloadError) => {
          if (!this._isMounted) return;
          if (payloadError) {
            this.handleError(payloadError, onError);
            return;
          }
          onCompleted(response);
        },
        error => {
          if (!this._isMounted) return;
          this.handleError(error, onError);
        },
      );

    render() {
      return <Component {...this.props} mutate={this.mutate} />;
    }
  };

export default withMutation;
