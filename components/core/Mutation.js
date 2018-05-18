// @flow
import * as React from 'react';
import type { Disposable, Environment, PayloadError } from 'react-relay';
import ErrorContext from './ErrorContext';
import EnvironmentContext from './EnvironmentContext';
// import { parsePayloadErrors, type Errors } from '../../server/error';

type Errors<T> = any;

export type Commit<Input, Response> = (
  environment: Environment,
  input: Input,
  onCompleted: (
    response: Response,
    payloadErrors: ?Array<PayloadError>,
  ) => void,
  onError: (error: any) => void,
) => Disposable;

type MutationProps = {|
  children: any => React.Node,
|};

type MutationState = {|
  pending: boolean,
|};

// Maybe one day I will rewrite it to higher order component, but not today.
// Function as child component is easier to write, use, and Flow type.
class Mutation extends React.PureComponent<MutationProps, MutationState> {
  state = { pending: false };

  componentWillUnmount() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  disposables: Array<Disposable> = [];

  mutate = (environment: any, dispatchError: any) => <Input, Response>(
    commit: Commit<Input, Response>,
    input: Input,
    onCompleted?: (response: Response) => void,
    onError?: (errors: Errors<Input>) => void,
  ) => {
    this.setState({ pending: true });

    const disposable = commit(
      environment,
      input,
      (response, payloadErrors) => {
        this.setState({ pending: false });
        if (!payloadErrors) {
          if (onCompleted) onCompleted(response);
          return;
        }
        // const { errors, error } = parsePayloadErrors(payloadErrors);
        // if (onError) onError(errors);
        // if (error) dispatchError(error);
      },
      error => {
        this.setState({ pending: false });
        if (onError) onError({});
        dispatchError({ type: 'unknown', message: error.message });
      },
    );
    this.disposables.push(disposable);
  };

  render() {
    return null;
    // return (
    //   <EnvironmentContext.Consumer>
    //     {environment => (
    //       <ErrorContext.Consumer>
    //         {({ dispatchError }) =>
    //           this.props.children({
    //             mutate: this.mutate(environment, dispatchError),
    //             pending: this.state.pending,
    //           })
    //         }
    //       </ErrorContext.Consumer>
    //     )}
    //   </EnvironmentContext.Consumer>
    // );
  }
}

export default Mutation;
