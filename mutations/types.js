// @flow
import type { Disposable, Environment, PayloadError } from 'react-relay';

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  onCompleted: (response: Response, errors: ?Array<PayloadError>) => void,
  onError: (error: Error) => void,
) => Disposable;
