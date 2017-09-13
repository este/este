// @flow
import React, { type ComponentType } from 'react';
import Box from './Box';
import Form from './Form';
import Heading from './Heading';
import Set from './Set';
import TextInputBig from './TextInputBig';
import ValidationError from './ValidationError';
import { SignInButton, SignUpButton } from './buttons';
import { defineMessages, injectIntl } from 'react-intl';
import SigninMutation from '../mutations/SigninMutation';
import SignupMutation from '../mutations/SignupMutation';
import cookie from 'cookie';
import URLSearchParams from 'url-search-params';
import { redirectUrlKey } from '../components/app';
import Router from 'next/router';
import withMutation, { getClientMutationId } from './withMutation';
import * as validation from '../lib/validation';

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'authForm.emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'authForm.passwordPlaceholder',
  },
});

type Props = {
  intl: *,
  mutate: *,
};

type State = {
  email: string,
  password: string,
  pending: boolean,
  validationErrors: validation.ValidationErrors<State>,
};

const initialState = {
  email: '',
  password: '',
  pending: false,
  validationErrors: {},
};

class Auth extends React.Component<Props, State> {
  state = initialState;

  handleCompleted = response => {
    // eslint-disable-next-line
    document.cookie = cookie.serialize('token', response.signinUser.token, {
      maxAge: 30 * 24 * 60 * 60, // one month, it's graph.cool default
    });
    const redirectPath = new URLSearchParams(window.location.search).get(
      redirectUrlKey,
    );
    Router.replace(redirectPath || '/');
  };

  handleError = error => {
    // https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
    const code =
      error &&
      error.source &&
      error.source.errors &&
      error.source.errors[0].code;
    let validationErrors = {};
    switch (code) {
      case 3022:
        validationErrors = { password: { type: 'wrongPassword' } };
        break;
      case 3023:
        validationErrors = { email: { type: 'alreadyExists' } };
        break;
    }
    this.setState({ pending: false, validationErrors });
  };

  auth(isSignUp) {
    const validationErrors = validation.validate(this.state, {
      email: [validation.required(), validation.email()],
      password: [validation.required(), validation.minLength(5)],
    });

    if (!validation.isValid(validationErrors)) {
      this.setState({ validationErrors });
      return;
    }

    this.setState({ pending: true });

    const email = {
      email: this.state.email,
      password: this.state.password,
    };

    const signinInput = { email, clientMutationId: getClientMutationId() };

    if (isSignUp) {
      this.props.mutate(
        SignupMutation.commit,
        {
          signupInput: {
            authProvider: { email },
            clientMutationId: getClientMutationId(),
          },
          signinInput,
        },
        this.handleCompleted,
        this.handleError,
      );
    } else {
      this.props.mutate(
        SigninMutation.commit,
        { signinInput },
        this.handleCompleted,
        this.handleError,
      );
    }
  }

  signUp = () => {
    this.auth(true);
  };

  signIn = () => {
    this.auth(false);
  };

  render() {
    const { intl } = this.props;
    const { pending, validationErrors } = this.state;
    return (
      <Box>
        <Heading size={3}>Auth</Heading>
        <Form onSubmit={this.signIn}>
          <Set vertical spaceBetween={0}>
            <TextInputBig
              autoFocus={validationErrors.email}
              disabled={pending}
              error={<ValidationError error={validationErrors.email} />}
              maxWidth={26}
              name="email"
              onChange={email => this.setState({ email })}
              placeholder={intl.formatMessage(messages.emailPlaceholder)}
              type="email"
              value={this.state.email}
            />
            <TextInputBig
              autoFocus={validationErrors.password}
              disabled={pending}
              error={<ValidationError error={validationErrors.password} />}
              maxWidth={26}
              name="password"
              onChange={password => this.setState({ password })}
              placeholder={intl.formatMessage(messages.passwordPlaceholder)}
              type="password"
              value={this.state.password}
            />
          </Set>
          <Set>
            <SignInButton disabled={pending} onPress={this.signIn} primary />
            <SignUpButton disabled={pending} onPress={this.signUp} />
          </Set>
        </Form>
      </Box>
    );
  }
}

const AuthWithMutation = withMutation(Auth);

// TODO: injectIntl should infers props type.
const AuthIntl: ComponentType<{}> = injectIntl(AuthWithMutation);

export default AuthIntl;
