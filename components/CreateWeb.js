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
import withAuth, { type AuthContext } from './withAuth';
import { validateWeb } from '../graphcool/functions/createWeb';

type Props = {
  mutate: *,
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

  context: AuthContext;

  handleCompleted = () => {
    this.setState(initialState);
  };

  handleError = () => {
    this.setState({ pending: false });
  };

  createWeb = () => {
    const { userId } = this.context;
    if (!userId) return;

    const variables = {
      input: {
        domain: '', // computed by hook function
        name: this.state.name.trim(),
        ownerId: userId,
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
      CreateWebMutation.commit(userId),
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

withAuth(CreateWeb);

const CreateWebWithMutation = withMutation(CreateWeb);

export default CreateWebWithMutation;
