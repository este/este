// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import type { Disposable, Environment } from 'react-relay';
import { ErrorPopupConsumer } from './ErrorPopup';
import {
  parsePayloadErrors,
  type Errors,
  type PayloadErrors,
} from '../server/error';

type Value = {|
  environment: Environment,
|};

const MutationContext: Context<Value> = createReactContext({
  environment: null,
});

export const MutationProvider = MutationContext.Provider;

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  onCompleted: (response: Response, payloadErrors: ?PayloadErrors) => void,
  onError: (error: any) => void,
) => Disposable;

type MutationProps = {|
  children: (mutate: *) => React.Node,
|};

class Mutation extends React.PureComponent<MutationProps> {
  componentWillUnmount() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  disposables: Array<Disposable> = [];

  mutate = (environment: *, showError: *) => <Variables, Response>(
    commit: Commit<Variables, Response>,
    variables: Variables,
    onCompleted: (response: Response) => void,
    onError: (errors: Errors<Variables>) => void,
  ) => {
    const disposable = commit(
      environment,
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
        onError({});
        showError({ type: 'unknownError', message: error.message });
      },
    );
    this.disposables.push(disposable);
  };

  render() {
    return (
      <MutationContext.Consumer>
        {({ environment }) => (
          <ErrorPopupConsumer>
            {({ showError }) =>
              this.props.children(this.mutate(environment, showError))
            }
          </ErrorPopupConsumer>
        )}
      </MutationContext.Consumer>
    );
  }
}

export default Mutation;
