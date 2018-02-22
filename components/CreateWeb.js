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
import Mutation from './Mutation';
import Error from './Error';
import * as validation from '../server/validation';

type Fields = {|
  name: string,
|};

type State = {|
  ...Fields,
  errors: Errors<Fields>,
|};

const initialState = {
  name: '',
  errors: {},
};

class CreateWeb extends React.PureComponent<{}, State> {
  state = initialState;

  handleCompleted = () => {
    this.setState(initialState);
  };

  handleError = (errors: *) => {
    this.setState({ errors });
  };

  createWeb = (mutate: *) => () => {
    const variables = {
      input: {
        name: this.state.name,
        clientMutationId: Date.now().toString(36),
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
