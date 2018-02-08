// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import type { Disposable, Environment } from 'react-relay';
import {
  parsePayloadErrors,
  type Errors,
  type PayloadErrors,
} from '../server/error';
import { ErrorPopupConsumer } from './ErrorPopup';

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  onCompleted: (response: Response, payloadErrors: ?PayloadErrors) => void,
  onError: (error: any) => void,
) => Disposable;

type Props = {|
  children: (mutate: *) => React.Node,
|};

class Mutate extends React.PureComponent<Props> {
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

  mutate = (showError: *) => <Variables, Response>(
    commit: Commit<Variables, Response>,
    variables: Variables,
    onCompleted: (response: Response) => void,
    onError: (errors: Errors<Variables>) => void,
  ) => {
    const disposable = commit(
      this.context.relay.environment,
      variables,
      (response, payloadErrors) => {
        if (!payloadErrors) {
          onCompleted(response);
          return;
        }
        const { errors, error } = parsePayloadErrors(payloadErrors);
        onError(errors);
        if (error) showError(error);
      },
      error => {
        // TODO: Investigate when it can happen.
        onError({});
        showError({ type: 'unknownError', message: error.message });
      },
    );
    this.disposables.push(disposable);
  };

  render() {
    return (
      <ErrorPopupConsumer>
        {({ showError }) => this.props.children(this.mutate(showError))}
      </ErrorPopupConsumer>
    );
  }
}

export default Mutate;
