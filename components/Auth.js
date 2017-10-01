// @flow
import * as React from 'react';
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
import URLSearchParams from 'url-search-params';
import { redirectUrlKey } from '../components/app';
import Router from 'next/router';
import withMutation, { getClientMutationId } from './withMutation';
import * as validation from '../lib/validation';
import { setCookie } from '../lib/cookie';

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

type Fields = {
  email: string,
  password: string,
};

type State = {
  pending: boolean,
  validationErrors: validation.ValidationErrors<Fields>,
} & Fields;

const initialState = {
  email: '',
  password: '',
  pending: false,
  validationErrors: {},
};

class Auth extends React.Component<Props, State> {
  state = initialState;

  handleCompleted = ({ signinUser: { user, token } }) => {
    // Relay generated types are often optional for smooth update in case of
    // schema change. Not yet updated clients will not fail.
    if (!user || !token) {
      this.setState({ pending: false });
      return;
    }
    setCookie({ token, userId: user.id });
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
    const fields = {
      email: this.state.email.trim(),
      password: this.state.password.trim(),
    };

    const validate = fields => {
      const email = validation.email(fields.email);
      if (email) return { email };
      const password = validation.password(fields.password);
      if (password) return { password };
    };

    const validationErrors = validate(fields);
    if (validationErrors) {
      this.setState({ validationErrors });
      return;
    }

    this.setState({ pending: true });

    const signinInput = {
      email: fields,
      clientMutationId: getClientMutationId(),
    };

    if (isSignUp) {
      this.props.mutate(
        SignupMutation.commit,
        {
          signupInput: {
            authProvider: { email: fields },
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

// ComponentType<{}> is required probably because injectIntl
const AuthIntl: React.ComponentType<{}> = injectIntl(AuthWithMutation);

export default AuthIntl;
