// @flow
import * as React from 'react';
import Form from './core/Form';
import { CreateButton } from './core/buttons';
import TextInputBig from './core/TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './core/Text';
import CreateWebMutation from '../mutations/CreateWebMutation';
import type { Errors } from '../server/error';
import Mutation, { clientMutationId } from './core/Mutation';
import Error from './core/Error';
import * as validation from '../server/validation';
import Row from './core/Row';

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
                    id="createWeb.name.label"
                  />
                </Text>
              }
              autoFocus={this.state.errors.name}
              disabled={pending}
              error={<Error>{this.state.errors.name}</Error>}
              onChangeText={name => this.setState({ name })}
              type="text"
              value={this.state.name}
            />
            <Row>
              <CreateButton
                color="primary"
                disabled={pending}
                onPress={this.createWeb(mutate)}
              />
            </Row>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateWeb;
