// @flow
import * as React from 'react';
import Form from './core/Form';
import { CreateButton } from './core/buttons';
import TextInputBig from './core/TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './core/Text';
import CreateWebMutation from '../mutations/CreateWebMutation';
import type { CreateWebInput } from '../mutations/__generated__/CreateWebMutation.graphql';
import type { Errors } from '../server/error';
import Mutation from './core/Mutation';
import * as validation from '../server/validation';
import Row from './core/Row';
import Block from './core/Block';

type CreateWebState = {|
  inputErrors: Errors<CreateWebInput>,
  name: string,
|};

class CreateWeb extends React.PureComponent<{}, CreateWebState> {
  static initialState = {
    inputErrors: {},
    name: '',
  };

  state = CreateWeb.initialState;

  // That's how we define event handlers.
  setName = (name: string) => this.setState({ name });

  setFocusOnError(inputErrors: Errors<CreateWebInput>) {
    const error = Object.keys(inputErrors)[0];
    if (!error) return;
    let current;
    switch (error) {
      case 'name':
        current = this.nameRef.current;
        break;
      default:
        (error: empty);
    }
    if (current) current.focus();
  }

  setErrors(inputErrors: Errors<CreateWebInput>) {
    this.setState({ inputErrors });
    this.setFocusOnError(inputErrors);
  }

  handleCompleted = () => {
    this.setState(CreateWeb.initialState);
  };

  handleError = (inputErrors: Errors<CreateWebInput>) => {
    this.setErrors(inputErrors);
  };

  createWeb = (mutate: *) => () => {
    // Create input object from state, props, whatever.
    const input = {
      name: this.state.name,
    };

    // Validate it. The same validation is called on the server.
    const inputErrors = validation.validateNewWeb(input);
    if (inputErrors) {
      this.setErrors(inputErrors);
      return;
    }

    mutate(
      CreateWebMutation.commit,
      input,
      this.handleCompleted,
      this.handleError,
    );
  };

  nameRef = React.createRef();

  render() {
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <Form onSubmit={this.createWeb(mutate)}>
            <Block>
              <TextInputBig
                label={
                  <Text>
                    <FormattedMessage
                      defaultMessage="Web Name"
                      id="createWeb.name.label"
                    />
                  </Text>
                }
                disabled={pending}
                error={this.state.inputErrors.name}
                onChangeText={this.setName}
                value={this.state.name}
                inputRef={this.nameRef}
              />
            </Block>
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
