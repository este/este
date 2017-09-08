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

    const onCompleted = response => {
      setCookieThenRedirect(response.signinUser.token);
    };

    const onError = error => {
      const validationErrors = mapRelayErrorToValidationError(error);
      this.setState({ pending: false, validationErrors });
    };

    // "if (isSignUp) {" breaks Flow. Both mutations type inference works well,
    // until if is used :-( I believe it's Flow error.

    // class type: Auth
    // This type is incompatible with
    // union: type application of polymorphic type: type
    // `React$StatelessFunctionalComponent` | class type: type application of
    // polymorphic type: class type: React$Component: components/withMutation.js:14
    // Member 1:
    // type application of polymorphic type: type
    // `React$StatelessFunctionalComponent`: /private/tmp/flow/flowlib_2b67ccc1/react.js:140
    // Error:
    // property `$call`: /private/tmp/flow/flowlib_2b67ccc1/react.js:140
    // Callable signature not found in
    // statics of Auth: components/Auth.js:188
    // Member 2:
    // class type: type application of polymorphic type: class type:
    // React$Component: /private/tmp/flow/flowlib_2b67ccc1/react.js:141
    // Error:
    // property `signupInput`: mutations/__generated__/SignupMutation.graphql.js:12
    // Property not found in
    // object type: mutations/SigninMutation.js:17
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
        onCompleted,
        onError,
      );
    } else {
      this.props.mutate(
        SigninMutation.commit,
        { signinInput },
        onCompleted,
        onError,
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

// $FlowFixMe I believe it's Flow bug because error message doesn't make sense.
const AuthWithMutation = withMutation(Auth);

// injectIntl should infers props type.
const AuthIntl: ComponentType<{}> = injectIntl(AuthWithMutation);

export default AuthIntl;
