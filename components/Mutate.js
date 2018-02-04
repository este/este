// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import type { Disposable, Environment } from 'react-relay';
import { AppErrorConsumer } from './AppError';
import type { ValidationErrors } from '../validation';

// https://github.com/facebook/relay/issues/2077
export const clientMutationId = () => Date.now().toString(36);

// TODO: Type it with Relay 1.5 improved PayloadError.
type PayloadErrors = Array<any>;

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  onCompleted: (response: Response, payloadErrors: ?PayloadErrors) => void,
  onError: (error: Error) => void,
) => Disposable;

type Props = {|
  children: (mutate: *) => React.Node,
|};

class Mutate extends React.PureComponent<Props> {
  static contextTypes = {
    relay: PropTypes.object,
  };

  // Check 'type BackendError'.
  static parse = (payloadErrors: PayloadErrors) => {
    let validationErrors = {};
    let appError = null;
    payloadErrors.forEach(payloadError => {
      // GraphQL spec plans typed errors, meanwhile we use JSON.
      let error;
      // TODO: There must be a better way to handle this shit.
      try {
        error = JSON.parse(payloadError.message);
      } catch (error) {
        // TODO: This is probably a bug workaround, not sure yet.
        const requestFailed =
          payloadError.message.indexOf(
            'failed, reason: getaddrinfo ENOTFOUND',
          ) !== -1;
        appError = requestFailed
          ? { type: 'requestFailed' }
          : { type: 'unknownError', message: payloadError.message };
        return;
      }
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
    return { validationErrors, appError };
  };

  componentWillUnmount() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  disposables: Array<Disposable> = [];

  context: {
    relay: { environment: Environment },
  };

  mutate = (dispatchAppError: *) => <Variables, Response>(
    commit: Commit<Variables, Response>,
    variables: Variables,
    onCompleted: (response: Response) => void,
    onError: (error: ValidationErrors<Variables>) => void,
  ) => {
    const disposable = commit(
      this.context.relay.environment,
      variables,
      (response, payloadErrors) => {
        if (!payloadErrors) {
          onCompleted(response);
          return;
        }
        const { validationErrors, appError } = Mutate.parse(payloadErrors);
        onError(validationErrors);
        if (appError) dispatchAppError(appError);
      },
      error => {
        onError({});
        dispatchAppError({ type: 'unknownError', message: error.message });
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
