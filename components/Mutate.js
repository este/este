// @flow
import * as React from 'react';
import type { Commit } from '../mutations/types';
import PropTypes from 'prop-types';
import type { Disposable, Environment } from 'react-relay';
import { AppErrorConsumer } from './AppError';
import type { ValidationErrors } from '../backend/src/validation';

// https://github.com/facebook/relay/issues/2077
export const clientMutationId = () => Date.now().toString(36);

type OnCompleted<Response> = (response: Response) => void;

type OnError<Variables> = (error: ValidationErrors<Variables>) => void;

type MutateAction = <Variables, Response>(
  commit: Commit<Variables, Response>,
  variables: Variables,
  onCompleted: OnCompleted<Response>,
  onError: OnError<Variables>,
) => void;

type MutateProps = {|
  children: (action: MutateAction) => React.Node,
|};

class Mutate extends React.PureComponent<MutateProps> {
  static contextTypes = {
    relay: PropTypes.object,
  };

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
    onError: OnError<Variables>,
  ) => {
    const disposable = commit(
      this.context.relay.environment,
      variables,
      (response, payloadErrors) => {
        if (!payloadErrors) {
          onCompleted(response);
          return;
        }

        let validationErrors = {};
        let appError = null;

        payloadErrors.forEach(payloadError => {
          // GraphQL spec plans typed errors, meanwhile we use JSON.
          const error = JSON.parse(payloadError.message);
          // App error is one validationError, for example, notAuthorized.
          const isAppError = typeof error.type === 'string';
          if (isAppError) {
            appError = error;
          } else {
            validationErrors = {
              ...validationErrors,
              ...error,
            };
          }
        });

        onError(validationErrors);
        if (appError) dispatchAppError(appError);
      },
      error => {
        // Tady musim zavolat onError s {}
        // a zbytek do appError
        // a pokud nezna, tak string, ok
        // Co je tohle za chyby? global, zavolat handleError prazdne
        // a dispatch apperror
        // TODO: Vyvolat takovou, asi fetch na offline, co dal? asi ni
        // console.log('error');
        // console.log(error);
        // TODO: Should we pass error, onError, dispatchAppError? Why?
        // imho ne, imho to je globalni vec, a lokal to nezajima
        // imho jo, imho takhle
        // Mutate.handleError({}, error, onError, dispatchAppError);
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
