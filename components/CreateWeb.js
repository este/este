// @flow
import React from 'react';
import Form from './Form';
import { CreateButton } from './buttons';
import TextInputBig from './TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './Text';
import Set from './Set';
import nameToDomain from '../lib/nameToDomain';
import { createFragmentContainer, graphql } from 'react-relay';
import { type CreateWeb_viewer } from './__generated__/CreateWeb_viewer.graphql';
import CreateWebMutation from '../mutations/CreateWebMutation';
import withMutation, { getClientMutationId } from './withMutation';

type Props = {
  mutate: *,
  viewer: CreateWeb_viewer,
};

type State = {
  name: string,
  pending: boolean,
};

const initialState = {
  name: '',
  pending: false,
};

class CreateWeb extends React.Component<Props, State> {
  state = initialState;

  getDomain() {
    return nameToDomain(this.state.name);
  }

  isValid() {
    return !this.state.pending && this.getDomain().length >= 3;
  }

  createWeb = () => {
    const { user } = this.props.viewer;
    if (!user) return;
    if (!this.isValid()) return;
    this.setState({ pending: true });

    this.props.mutate(
      CreateWebMutation.commit,
      {
        input: {
          domain: this.getDomain(),
          name: this.state.name,
          ownerId: user.id,
          clientMutationId: getClientMutationId(),
        },
      },
      () => {
        this.setState(initialState);
      },
      () => {
        this.setState({ pending: false });
      },
    );
  };

  render() {
    const { pending } = this.state;
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
          autoFocus
          onChange={name => this.setState({ name })}
          type="text"
          value={this.state.name}
          disabled={pending}
        />
        <Set>
          <CreateButton primary disabled={pending} onPress={this.createWeb} />
        </Set>
      </Form>
    );
  }
}

const CreateWebWithMutation = withMutation(CreateWeb);

export default createFragmentContainer(CreateWebWithMutation, {
  viewer: graphql`
    fragment CreateWeb_viewer on Viewer {
      user {
        id
      }
    }
  `,
});
