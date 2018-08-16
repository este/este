// @flow
import * as React from 'react';
import { CreateButton } from './core/buttons';
import TextInput from './core/TextInput';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import Row from './core/Row';
import withMutation from './core/withMutation';
import * as validations from '../validations';
import Router from 'next/router';
import type { Href } from './app/sitemap';
import { pipe } from 'ramda';
import CreateWebMutation, {
  type CreateWebCommit,
  type CreateWebErrors,
} from '../mutations/CreateWebMutation';

export const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Home',
    id: 'createWeb.pageTitle',
  },
  label: {
    defaultMessage: 'Web Name',
    id: 'createWeb.name.label',
  },
});

type CreateWebProps = {|
  commit: CreateWebCommit,
  pending: boolean,
  intl: IntlShape,
|};

type CreateWebState = {|
  errors: CreateWebErrors,
  name: string,
  disabled: boolean,
|};

class CreateWeb extends React.PureComponent<CreateWebProps, CreateWebState> {
  state = {
    errors: null,
    name: '',
    disabled: false,
  };

  // That's how we bind event handlers.
  // https://reactjs.org/docs/faq-functions.html#why-is-binding-necessary-at-all
  setName = name => this.setState({ name });

  redirectToPage = id => () => {
    const href: Href = {
      pathname: '/page',
      query: { id },
    };
    Router.push(href);
  };

  handleCompleted = ({ createWeb }) => {
    // Payload can be a null, because resolver can throw or be deprecated or
    // whatever. Serious errors are handled globally, so nothing to do here.
    if (!createWeb) return;
    const { errors, pageId } = createWeb;
    if (errors) {
      this.setState({ errors });
      return;
    }
    // We can only redirect if we have pageId. Remember, anything can fail if
    // network and a server is involved. Handle it gradually.
    if (pageId == null) return;
    // Disable form before the redirect so it's not confusing for a user.
    this.setState({ disabled: true }, this.redirectToPage(pageId));
  };

  createWeb = () => {
    const pageTitle = this.props.intl.formatMessage(messages.pageTitle);

    // Create input object from state, props, whatever.
    const input = {
      name: this.state.name,
      pageTitle,
    };

    const errors = validations.validateCreateWeb(input);
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.props.commit(input, this.handleCompleted);
  };

  render() {
    const { errors } = this.state;
    const disabled = this.props.pending || this.state.disabled;

    return (
      <>
        <TextInput
          label={this.props.intl.formatMessage(messages.label)}
          disabled={disabled}
          error={errors && errors.name}
          focusOnError={errors}
          onChangeText={this.setName}
          value={this.state.name}
          onSubmitEditing={this.createWeb}
          placeholder="…"
        />
        <Row>
          <CreateButton
            color="primary"
            disabled={disabled}
            onPress={this.createWeb}
          />
        </Row>
      </>
    );
  }
}

export default pipe(
  injectIntl,
  withMutation(CreateWebMutation),
)(CreateWeb);
