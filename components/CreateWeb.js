// @flow
import * as React from 'react';
import Form from './core/Form';
import { CreateButton } from './core/buttons';
import TextInput from './core/TextInput';
import { defineMessages, FormattedMessage, type IntlShape } from 'react-intl';
import * as generated from './__generated__/CreateWebMutation.graphql';
import Row from './core/Row';
import Block from './core/Block';
import { graphql } from 'react-relay';
import withMutation, { type Commit, type Errors } from './core/withMutation';
import { validateCreateWeb } from '../server/api/webs.mjs';
import Router from 'next/router';
import type { Href } from './app/sitemap';
import withIntl from './core/withIntl';

export const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Home',
    id: 'createWeb.pageTitle',
  },
});

type CreateWebProps = {|
  commit: Commit<generated.CreateWebInput, generated.CreateWebMutationResponse>,
  pending: boolean,
  intl: IntlShape,
|};

type CreateWebState = {|
  errors: Errors<generated.CreateWebMutationResponse, 'createWeb'>,
  name: string,
  pageTitle: string,
|};

class CreateWeb extends React.PureComponent<CreateWebProps, CreateWebState> {
  static initialState = {
    errors: null,
    name: '',
    pageTitle: '',
  };

  state = CreateWeb.initialState;

  // That's how we bind event handlers.
  // https://reactjs.org/docs/faq-functions.html#why-is-binding-necessary-at-all
  setName = (name: string) => this.setState({ name });

  handleCompleted = ({ createWeb }) => {
    // Payload can be null, because resolver can throw or be deprecated or
    // whatever. Serious errors are handled globally. Nothing to do here anyway.
    if (!createWeb) return;
    const { errors, pageId } = createWeb;
    if (errors) {
      this.setState({ errors });
      return;
    }
    // No errors, we can reset the form.
    this.setState(CreateWeb.initialState);
    // And maybe redirect to edit.
    if (pageId == null) return;
    const href: Href = {
      pathname: '/edit',
      query: { pageId },
    };
    Router.replace(href);
  };

  createWeb = () => {
    const pageTitle = this.props.intl.formatMessage(messages.pageTitle);

    // Create input object from state, props, whatever.
    const input = {
      name: this.state.name,
      pageTitle,
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
      <Form>
        <Block>
          <TextInput
            label={
              <FormattedMessage
                defaultMessage="Web Name"
                id="createWeb.name.label"
              />
            }
            disabled={this.props.pending}
            error={errors && errors.name}
            focusOnError={errors}
            onChangeText={this.setName}
            value={this.state.name}
            onSubmitEditing={this.createWeb}
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

export default withMutation(
  withIntl(CreateWeb),
  graphql`
    mutation CreateWebMutation($input: CreateWebInput!) {
      createWeb(input: $input) {
        pageId
        errors {
          name
          pageTitle
        }
      }
    }
  `,
);
