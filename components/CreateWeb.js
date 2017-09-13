// @flow
import React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import nameToDomain from '../lib/nameToDomain';
import CreateWebMutation from '../mutations/CreateWebMutation';
import withMutation, { getClientMutationId } from './withMutation';
import * as validation from '../lib/validation';
import ValidationError from './ValidationError';

type Props = {
  mutate: *,
  ownerId: string,
};

type State = {
  name: string,
  pending: boolean,
  validationErrors: validation.ValidationErrors<State>,
};

const initialState = {
  name: '',
  pending: false,
  validationErrors: {},
};

// $FlowFixMe https://github.com/este/este/issues/1404#issuecomment-328968006
class CreateWeb extends React.Component<Props, State> {
  state = initialState;

  handleCompleted = () => {
    this.setState(initialState);
  };

  handleError = () => {
    this.setState({ pending: false });
  };

  createWeb = () => {
    const validationErrors = validation.validate(this.state, {
      name: [validation.required(), validation.minLength(3)],
    });

    if (!validation.isValid(validationErrors)) {
      this.setState({ validationErrors });
      return;
    }

    this.setState({ pending: true });

    this.props.mutate(
      CreateWebMutation.commit,
      {
        input: {
          domain: nameToDomain(this.state.name),
          name: this.state.name,
          ownerId: this.props.ownerId,
          clientMutationId: getClientMutationId(),
        },
      },
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
