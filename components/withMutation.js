// @flow
import React, { type ComponentType } from 'react';
import type { Commit, Environment } from '../types';
import PropTypes from 'prop-types';

type Mutate<V, R> = (
  commit: Commit<V, R>,
  variables: V,
  onCompleted: (response: R) => void,
  onError: (error: any) => void,
) => void;

const withMutation = <Props: {}, Variables, Response>(
  Component: ComponentType<
    {
      mutate: Mutate<Variables, Response>,
    } & Props,
  >,
): ComponentType<Props> =>
  class WrapperComponent extends React.Component<Props> {
    static contextTypes = {
      relay: PropTypes.object,
    };

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    // It's always better to unsubscribe, but Relay commit doesn't support that,
    // so we have to track _isMounted.
    // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
    _isMounted: boolean;

    context: { relay: { environment: Environment } };

    mutate = (commit, variables, onCompleted, onError) =>
      commit(
        this.context.relay.environment,
        variables,
        (response, payloadError) => {
          if (!this._isMounted) return;
          if (payloadError) {
            onError(payloadError);
          }
          onCompleted(response);
        },
        error => {
          if (!this._isMounted) return;
          onError(error);
        },
      );

    render() {
      return <Component {...this.props} mutate={this.mutate} />;
    }
  };

export default withMutation;
