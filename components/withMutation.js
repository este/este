// @flow
import React, { type ComponentType } from 'react';
import type { Commit, Environment } from '../types';
import PropTypes from 'prop-types';

type Mutate = <Variables, Response>(
  commit: Commit<Variables, Response>,
  variables: Variables,
  onCompleted: (response: Response) => void,
  onError: (error: any) => void,
) => void;

const withMutation = <Props: {}>(
  Component: ComponentType<
    {
      mutate: Mutate,
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

    // We have to track _isMounted, because Relay doesn't support unsubscribe.
    // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
    _isMounted: boolean;

    context: { relay: { environment: Environment } };

    // We can't reuse Mutate type here.
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
