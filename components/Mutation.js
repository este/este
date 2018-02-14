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

type Pending = boolean;

type MutationProps = {|
  children: (*) => React.Node,
|};

type MutationState = {|
  pending: Pending,
|};

class Mutation extends React.PureComponent<MutationProps, MutationState> {
  state = { pending: false };

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
    this.setState({ pending: true });

    const disposable = commit(
      environment,
      variables,
      (response, payloadErrors) => {
        this.setState({ pending: false });
        if (!payloadErrors) {
          onCompleted(response);
          return;
        }
        const { errors, error } = parsePayloadErrors(payloadErrors);
        onError(errors);
        if (error) showError(error);
      },
      error => {
        this.setState({ pending: false });
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
              this.props.children({
                mutate: this.mutate(environment, showError),
                pending: this.state.pending,
              })
            }
          </ErrorPopupConsumer>
        )}
      </MutationContext.Consumer>
    );
  }
}

export default Mutation;
