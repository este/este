// @flow
import * as React from 'react';
import Form from './core/Form';
import { CreateButton } from './core/buttons';
import TextInputBig from './core/TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './core/Text';
import CreateWebMutation from '../mutations/CreateWebMutation';
import type { Errors } from '../server/error';
import Mutation from './core/Mutation';
import * as validation from '../server/validation';
import Row from './core/Row';
import Block from './core/Block';

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

  setName = (name: string) => this.setState({ name });

  setFocusOnError(errors: Errors<Fields>) {
    const field = Object.keys(errors)[0];
    if (!field) return;
    let current;
    switch (field) {
      case 'name':
        current = this.nameRef.current;
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (field: empty);
    }
    if (current) current.focus();
  }

  setErrors(errors: Errors<Fields>) {
    this.setState({ errors });
    this.setFocusOnError(errors);
  }

  handleCompleted = () => {
    this.setState(CreateWeb.initialState);
  };

  handleError = (errors: *) => {
    this.setErrors(errors);
  };

  createWeb = (mutate: *) => () => {
    const variables = {
      name: this.state.name,
    };

    const errors = validation.validateNewWeb(variables);
    if (errors) {
      this.setErrors(errors);
      return;
    }

    mutate(
      CreateWebMutation.commit,
      variables,
      this.handleCompleted,
      this.handleError,
    );
  };

  // $FlowFixMe
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
                error={this.state.errors.name}
                onChangeText={this.setName}
                type="text"
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
