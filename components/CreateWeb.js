// @flow
import * as React from 'react';
import Form from './core/Form';
import { CreateButton } from './core/buttons';
import TextInputBig from './core/TextInputBig';
import { FormattedMessage } from 'react-intl';
import Text from './core/Text';
import * as generated from './__generated__/CreateWebMutation.graphql';
import Row from './core/Row';
import Block from './core/Block';
import { graphql } from 'react-relay';
import withMutation, { type Commit, type Errors } from './core/withMutation';
import { ConnectionHandler } from 'relay-runtime';
import { validateCreateWeb } from '../server/api/webs.mjs';

type CreateWebProps = {|
  commit: Commit<generated.CreateWebInput, generated.CreateWebMutationResponse>,
  pending: boolean,
|};

type CreateWebState = {|
  errors: Errors<generated.CreateWebMutationResponse, 'createWeb'>,
  name: string,
|};

class CreateWeb extends React.PureComponent<CreateWebProps, CreateWebState> {
  static initialState = {
    errors: null,
    name: '',
  };

  state = CreateWeb.initialState;

  // That's how we bind event handlers.
  // https://reactjs.org/docs/faq-functions.html#why-is-binding-necessary-at-all
  setName = (name: string) => this.setState({ name });

  handleCompleted = ({ createWeb }) => {
    // Payload can be null, because resolver can throw or be deprecated or
    // whatever. Serious errors are handled globally. Nothing to do anyway.
    if (!createWeb) return;
    if (createWeb.errors) {
      this.setState({ errors: createWeb.errors });
      return;
    }
    this.setState(CreateWeb.initialState);
  };

  createWeb = () => {
    // Create input object from state, props, whatever.
    const input = {
      name: this.state.name,
    };

    // Use server validation for client validation.
    const errors = validateCreateWeb(input);
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.props.commit(input, this.handleCompleted);
  };

  render() {
    const { errors } = this.state;

    return (
      <Form onSubmit={this.createWeb}>
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
            disabled={this.props.pending}
            error={errors && errors.name}
            focusOnError={errors}
            onChangeText={this.setName}
            value={this.state.name}
          />
        </Block>
        <Row>
          <CreateButton
            color="primary"
            disabled={this.props.pending}
            onPress={this.createWeb}
          />
        </Row>
      </Form>
    );
  }
}

const sharedUpdater = (store, recordEdge) => {
  const connection = ConnectionHandler.getConnection(
    store.get('client:root'),
    'Webs_webs',
  );
  ConnectionHandler.insertEdgeAfter(connection, recordEdge);
};

export default withMutation(
  CreateWeb,
  graphql`
    mutation CreateWebMutation($input: CreateWebInput!) {
      createWeb(input: $input) {
        edge {
          node {
            ...WebsItem
          }
        }
        errors {
          name
        }
      }
    }
  `,
  {
    updater: store => {
      const payload = store.getRootField('createWeb');
      // Because the server can return an empty payload, e.g. for 401.
      if (!payload) return;
      const recordEdge = payload.getLinkedRecord('edge');
      // Because anything can fail anyway.
      if (!recordEdge) return;
      sharedUpdater(store, recordEdge);
    },
  },
);
