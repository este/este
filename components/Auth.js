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
import validate, {
  type ValidationErrors,
  required,
  minLength,
  email,
} from '../lib/validate';
import SigninMutation from '../mutations/SigninMutation';
import SignupMutation from '../mutations/SignupMutation';
import cookie from 'cookie';
import URLSearchParams from 'url-search-params';
import { redirectUrlKey } from '../components/app';
import Router from 'next/router';
import withMutation from './withMutation';

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
  pending: boolean,
  email: string,
  password: string,
  validationErrors: ValidationErrors<State>,
};

const initialState = {
  pending: false,
  email: '',
  password: '',
  validationErrors: {},
};

class Auth extends React.Component<Props, State> {
  static mapRelayErrorToValidationError = error => {
    switch (error &&
      error.source &&
      error.source.errors &&
      error.source.errors[0].code) {
      case 3022:
        // No user found with that information
        return { password: { type: 'required' } };
      case 3023:
        // User already exists with that information
        return { email: { type: 'alreadyExists' } };
      default:
        return {};
    }
  };

  state = initialState;

  onCompleted = response => {
    // eslint-disable-next-line
    document.cookie = cookie.serialize('token', response.signinUser.token, {
      maxAge: 30 * 24 * 60 * 60, // one month, it's graph.cool default
    });
    const redirectPath = new URLSearchParams(window.location.search).get(
      redirectUrlKey,
    );
    Router.replace(redirectPath || '/');
  };

  onError = error => {
    const validationErrors = Auth.mapRelayErrorToValidationError(error);
    this.setState({ pending: false, validationErrors });
  };

  validate() {
    return validate(this.state, {
      email: [required(), email()],
      password: [required(), minLength(5)],
    });
  }

  auth(isSignUp) {
    const validationErrors = this.validate();
    this.setState({ validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    this.setState({ pending: true });

    const email = { email: this.state.email, password: this.state.password };
    const signinInput = {
      email,
      clientMutationId: Date.now().toString(36),
    };

    if (isSignUp) {
      this.props.mutate(
        SignupMutation.commit,
        {
          signupInput: {
            authProvider: { email },
            clientMutationId: Date.now().toString(36),
          },
          signinInput,
        },
        this.onCompleted,
        this.onError,
      );
    } else {
      this.props.mutate(
        SigninMutation.commit,
        { signinInput },
        this.onCompleted,
        this.onError,
      );
    }
  }

  signUp = () => this.auth(true);

  signIn = () => this.auth(false);

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

// injectIntl should infers props type.
const AuthIntl: ComponentType<{}> = injectIntl(AuthWithMutation);

export default AuthIntl;
