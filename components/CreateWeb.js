// @flow
import * as React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import CreateWebMutation from '../mutations/CreateWebMutation';
import type { Errors } from '../server/error';
import Mutation, { clientMutationId } from './Mutation';
import Error from './Error';
import * as validation from '../server/validation';

type Fields = {|
  name: string,
|};

type CreateWebState = {|
  ...Fields,
  errors: Errors<Fields>,
|};

class CreateWeb extends React.PureComponent<{}, CreateWebState> {
  static initialState = {
    name: '',
    errors: {},
  };

  state = CreateWeb.initialState;

  handleCompleted = () => {
    this.setState(CreateWeb.initialState);
  };

  handleError = (errors: *) => {
    this.setState({ errors });
  };

  createWeb = (mutate: *) => () => {
    const variables = {
      input: {
        name: this.state.name,
        clientMutationId: clientMutationId(),
      },
    };

    const errors = validation.validateNewWeb(variables.input);
    if (errors) {
      this.setState({ errors });
      return;
    }

    mutate(
      CreateWebMutation.commit,
      variables,
      this.handleCompleted,
      this.handleError,
    );
  };

  render() {
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <Form onSubmit={this.createWeb(mutate)}>
            <TextInputBig
              label={
                <Text>
                  <FormattedMessage
                    defaultMessage="Web Name"
                    id="createApp.label"
                  />
                </Text>
              }
              autoFocus={this.state.errors.name}
              disabled={pending}
              error={<Error>{this.state.errors.name}</Error>}
              onChange={name => this.setState({ name })}
              type="text"
              value={this.state.name}
            />
            <Set>
              <CreateButton
                primary
                disabled={pending}
                onPress={this.createWeb(mutate)}
              />
            </Set>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateWeb;
