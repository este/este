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

type Props = {
  viewer: CreateWeb_viewer,
  relay: { environment: Object },
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
    // TODO: Make better API. Handling global errors, unlisten on unmount, etc.
    CreateWebMutation.commit(
      this.props.relay.environment,
      {
        input: {
          domain: this.getDomain(),
          name: this.state.name,
          ownerId: user.id,
          // https://github.com/facebook/relay/issues/2077
          clientMutationId: Date.now().toString(36),
        },
      },
      (response, payloadError) => {
        if (payloadError) {
          this.setState({ pending: false });
        } else {
          this.setState(initialState);
        }
      },
      () => {
        this.setState({ pending: false });
      },
    );
  };

  render() {
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
          disabled={this.state.pending}
        />
        <Set>
          <CreateButton
            primary
            disabled={!this.isValid()}
            onPress={this.createWeb}
          />
        </Set>
      </Form>
    );
  }
}

// const CreateWebWithMutation = withMutation(CreateWeb);

export default createFragmentContainer(CreateWeb, {
  viewer: graphql`
    fragment CreateWeb_viewer on Viewer {
      user {
        id
      }
    }
  `,
});
