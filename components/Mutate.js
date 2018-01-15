// @flow
import * as React from 'react';
import type { Commit } from '../mutations/types';
import PropTypes from 'prop-types';
import { mutationErrorToAppError } from '../lib/appError';
import type { Disposable, Environment } from 'react-relay';
import { AppErrorConsumer } from './AppError';

// https://github.com/facebook/relay/issues/2077
export const clientMutationId = () => Date.now().toString(36);

type OnCompleted<Response> = (response: Response) => void;

type OnError = (error: any) => void | boolean;

type MutateAction = <Variables, Response>(
  commit: Commit<Variables, Response>,
  variables: Variables,
  onCompleted: OnCompleted<Response>,
  onError: OnError,
) => void;

type MutateProps = {|
  children: (action: MutateAction) => React.Node,
|};

class Mutate extends React.PureComponent<MutateProps> {
  static contextTypes = {
    relay: PropTypes.object,
  };

  static handleError(error: *, onError: *, dispatchAppError: *) {
    const handled = onError(error);
    if (handled === true) return;
    const appError = mutationErrorToAppError(error);
    dispatchAppError(appError);
  }

  componentWillUnmount() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  disposables: Array<Disposable> = [];

  context: {
    relay: { environment: Environment },
  };

  // We can't reuse MutateAction type here as far I know. PR anyone?
  // https://twitter.com/calebmer/status/906561429129502720
  mutate = (dispatchAppError: *) => <Variables, Response>(
    commit: Commit<Variables, Response>,
    variables: Variables,
    onCompleted: OnCompleted<Response>,
    onError: OnError,
  ) => {
    const disposable = commit(
      this.context.relay.environment,
      variables,
      (response, payloadError) => {
        if (payloadError) {
          Mutate.handleError(payloadError, onError, dispatchAppError);
          return;
        }
        onCompleted(response);
      },
      error => {
        Mutate.handleError(error, onError, dispatchAppError);
      },
    );
    this.disposables.push(disposable);
  };

  render() {
    return (
      <AppErrorConsumer>
        {({ dispatchAppError }) =>
          this.props.children(this.mutate(dispatchAppError))
        }
      </AppErrorConsumer>
    );
  }
}

export default Mutate;
