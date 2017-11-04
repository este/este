// @flow
import * as React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import CreateWebMutation from '../mutations/CreateWebMutation';
import withMutation, { getClientMutationId } from './withMutation';
import * as validation from '../graphcool/lib/validation';
import ValidationError from './ValidationError';
import { validateWeb } from '../graphcool/functions/createWeb';

type Props = {
  mutate: *,
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

class CreateWeb extends React.Component<Props, State> {
  state = initialState;

  handleCompleted = () => {
    this.setState(initialState);
  };

  handleError = () => {
    this.setState({ pending: false });
  };

  createWeb = () => {
    const variables = {
      input: {
        domain: '', // computed by hook function
        name: this.state.name.trim(),
        ownerId: this.props.userId,
        clientMutationId: getClientMutationId(),
      },
    };

    const validationErrors = validateWeb(variables.input);
    if (validationErrors) {
      this.setState({ validationErrors });
      return;
    }

    this.setState({ pending: true });
    this.props.mutate(
      CreateWebMutation.commit(this.props.userId),
      variables,
      this.handleCompleted,
      this.handleError,
    );
  };

  render() {
    const { pending, validationErrors } = this.state;
    return (
      <Form onSubmit={this.createWeb}>
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
          <CreateButton primary disabled={pending} onPress={this.createWeb} />
        </Set>
      </Form>
    );
  }
}

const CreateWebWithMutation = withMutation(CreateWeb);

export default CreateWebWithMutation;
