// @flow
import * as React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import CreateWebMutation from '../mutations/CreateWebMutation';
import Mutate, { clientMutationId } from './Mutate';
import * as validation from '../graphcool/lib/validation';
import ValidationError from './ValidationError';
import { validateWeb } from '../graphcool/functions/createWeb';

type Props = {
  userId: string,
};

type Fields = {
  name: string,
};

type State = {
  pending: boolean,
  validationErrors: validation.ValidationErrors<Fields>,
} & Fields;

const initialState = {
  name: '',
  pending: false,
  validationErrors: {},
};

class CreateWeb extends React.PureComponent<Props, State> {
  state = initialState;

  handleCompleted = () => {
    this.setState(initialState);
  };

  handleError = () => {
    this.setState({ pending: false });
  };

  createWeb = (mutate: *) => () => {
    const variables = {
      input: {
        domain: '', // computed by hook function
        name: this.state.name.trim(),
        ownerId: this.props.userId,
        clientMutationId: clientMutationId(),
      },
    };

    const validationErrors = validateWeb(variables.input);
    if (validationErrors) {
      this.setState({ validationErrors });
      return;
    }

    this.setState({ pending: true });
    mutate(
      CreateWebMutation.commit(this.props.userId),
      variables,
      this.handleCompleted,
      this.handleError,
    );
  };

  render() {
    return (
      <Mutate>
        {mutate => {
          const { pending, validationErrors } = this.state;
          return (
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
                autoFocus={validationErrors.name}
                disabled={pending}
                error={<ValidationError error={validationErrors.name} />}
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
          );
        }}
      </Mutate>
    );
  }
}

export default CreateWeb;
