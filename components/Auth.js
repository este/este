// @flow
import React, { type ComponentType } from 'react';
import Box from './Box';
import Form from './Form';
import Heading from './Heading';
import Set from './Set';
import TextInputBig from './TextInputBig';
import ValidationError from './ValidationError';
import { SignInButton, SignUpButton } from './buttons';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';
import validate, {
  type ValidationErrors,
  required,
  minLength,
  email,
} from '../lib/validate';
import withRelay, { type RelayContext } from './withRelay';
import SigninMutation from '../mutations/SigninMutation';
import SignupMutation from '../mutations/SignupMutation';
import cookie from 'cookie';
import URLSearchParams from 'url-search-params';
import { redirectUrlKey } from '../components/app';
import Router from 'next/router';

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
  intl: IntlShape,
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

const setCookieThenRedirect = token => {
  // eslint-disable-next-line
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60, // one month, it's graph.cool default
  });
  const redirectPath = new URLSearchParams(window.location.search).get(
    redirectUrlKey,
  );
  Router.replace(redirectPath || '/');
};

const mapRelayErrorToValidationError = error => {
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

class Auth extends React.Component<Props, State> {
  state = initialState;

  onCompleted = (response, payloadError) => {
    if (payloadError) {
      this.setState({ pending: false });
    } else {
      setCookieThenRedirect(response.signinUser.token);
    }
  };

  onError = error => {
    const validationErrors = mapRelayErrorToValidationError(error);
    this.setState({ pending: false, validationErrors });
  };

  validate() {
    return validate(this.state, {
      email: [required(), email()],
      password: [required(), minLength(5)],
    });
  }

  context: RelayContext;

  auth(isSignUp) {
    const validationErrors = this.validate();
    this.setState({ validationErrors });
    if (Object.keys(validationErrors).length > 0) return;
    this.setState({ pending: true });

    const { environment } = this.context.relay;
    const { email, password } = this.state;
    const signinInput = {
      email: { email, password },
      clientMutationId: Date.now().toString(36),
    };

    if (isSignUp) {
      SignupMutation.commit(
        environment,
        {
          signupInput: {
            authProvider: { email: { email, password } },
            clientMutationId: Date.now().toString(36),
          },
          signinInput,
        },
        this.onCompleted,
        this.onError,
      );
    } else {
      SigninMutation.commit(
        environment,
        { signinInput },
        this.onCompleted,
        this.onError,
      );
    }
  }

  signIn = () => {
    this.auth(false);
  };

  signUp = () => {
    this.auth(true);
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
              removeWebkitYellowAutofill
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
              removeWebkitYellowAutofill
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

withRelay(Auth);

const AuthFormIntl: ComponentType<{}> = injectIntl(Auth);

export default AuthFormIntl;
