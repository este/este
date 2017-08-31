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
import type { Subscription } from 'rxjs';

class CreateWeb extends React.Component<
  { viewer: CreateWeb_viewer, relay: { environment: Object } },
  { name: string, pending: boolean },
> {
  state = {
    name: '',
    pending: false,
  };

  componentWillUnmount() {
    // Doing this manually sucks. We deserve a better design.
    if (this.mutationObserver) this.mutationObserver.unsubscribe();
  }

  getDomain() {
    return nameToDomain(this.state.name);
  }

  canSubmit() {
    return !this.state.pending && this.getDomain().length >= 3;
  }

  handleNameChange = (name: string) => {
    this.setState({ name });
  };

  mutationObserver: ?Subscription;

  createWeb = () => {
    const { user } = this.props.viewer;
    if (!user) return;
    if (!this.canSubmit()) return;
    this.setState({ pending: true });
    this.mutationObserver = CreateWebMutation.commit(
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
    ).subscribe(() => this.setState({ name: '', pending: false }));
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
          onChange={this.handleNameChange}
          type="text"
          value={this.state.name}
          disabled={this.state.pending}
        />
        <Set>
          <CreateButton
            primary
            disabled={!this.canSubmit()}
            onPress={this.createWeb}
          />
        </Set>
      </Form>
    );
  }
}

export default createFragmentContainer(CreateWeb, {
  viewer: graphql`
    fragment CreateWeb_viewer on Viewer {
      user {
        id
      }
    }
  `,
});
