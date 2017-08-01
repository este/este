// @flow
import type { Environment } from '../types';
import { commitMutation as relayCommitMutation } from 'react-relay';

// Custom commitMutation.
//  - map commitMutation callbacks to promise for epics
//  - map graph.cool errors to app errors

type Config = {
  mutation: Object,
  variables: ?Object,
};

const mapGraphCoolErrorToAppErrors = (error: Object) => {
  const code =
    error &&
    error.source &&
    error.source.errors &&
    error.source.errors[0] &&
    error.source.errors[0].code;
  switch (code) {
    case 3022:
      return { appError: { type: 'cannotSignInCredentialsInvalid' } };
    case 3023:
      return { validationErrors: { email: { type: 'alreadyExists' } } };
    default:
      return { appError: { type: 'unknown', message: error.message } };
  }
};

const commitMutation = (environment: Environment, config: Config) =>
  new Promise((resolve, reject) => {
    relayCommitMutation(environment, {
      ...config,
      onCompleted: response => resolve(response),
      onError: error => reject(mapGraphCoolErrorToAppErrors(error)),
    });
  });

export default commitMutation;
