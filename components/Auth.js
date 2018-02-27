// @flow
import * as React from 'react';
import Box from './Box';
import Form from './Form';
import Heading from './Heading';
import Set from './Set';
import TextInputBig from './TextInputBig';
import Error from './Error';
import { SignInButton, SignUpButton } from './buttons';
import SigninMutation from '../mutations/SigninMutation';
import SignupMutation from '../mutations/SignupMutation';
import Router from 'next/router';
import Mutation from './Mutation';
import * as validation from '../server/validation';
import { setCookie } from '../components/app/cookie';
import type { Errors } from '../server/error';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';

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

type Props = {|
  intl: IntlShape,
|};

type Fields = {|
  email: string,
  password: string,
|};

type State = {|
  ...Fields,
  errors: Errors<Fields>,
|};

const initialState = {
  email: '',
  password: '',
  errors: {},
};

class Auth extends React.PureComponent<Props, State> {
  state = initialState;

  handleCompleted = (response: *) => {
    // http://graphql.org/learn/best-practices/#nullability
    const payload = response.signin || response.signup || null;
    // https://flow.org/en/docs/lang/refinements
    if (payload == null) return;
    const { token } = payload;
    setCookie({ token });
    Router.replace({
      pathname: Router.pathname,
      query: Router.query,
    });
  };

  handleError = (errors: *) => {
    this.setState({ errors });
  };

  auth = (mutate: *, isSignUp?: boolean) => () => {
    const variables = {
      email: this.state.email,
      password: this.state.password,
    };

    const errors = validation.validateEmailPassword(variables);
    if (errors) {
      this.setState({ errors });
      return;
    }

    if (isSignUp === true) {
      mutate(
        SignupMutation.commit,
        variables,
        this.handleCompleted,
        this.handleError,
      );
    } else {
      mutate(
        SigninMutation.commit,
        variables,
        this.handleCompleted,
        this.handleError,
      );
    }
  };

  render() {
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <div>
            {/* https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete/32505530#32505530 */}
            <style jsx>{`
              div :global(input:-webkit-autofill),
              div :global(input:-webkit-autofill:hover),
              div :global(input:-webkit-autofill:focus),
              div :global(input:-webkit-autofill:active) {
                -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
                -webkit-transition-delay: 9999s;
              }
            `}</style>
            <Box>
              <Heading size={3}>Auth</Heading>
              <Form onSubmit={this.auth(mutate)}>
                <Set vertical spaceBetween={0}>
                  <TextInputBig
                    autoFocus={this.state.errors.email}
                    disabled={pending}
                    error={<Error>{this.state.errors.email}</Error>}
                    maxWidth={26}
                    name="email"
                    onChange={email => this.setState({ email })}
                    placeholder={this.props.intl.formatMessage(
                      messages.emailPlaceholder,
                    )}
                    type="email"
                    value={this.state.email}
                  />
                  <TextInputBig
                    autoFocus={this.state.errors.password}
                    disabled={pending}
                    error={<Error>{this.state.errors.password}</Error>}
                    maxWidth={26}
                    name="password"
                    onChange={password => this.setState({ password })}
                    placeholder={this.props.intl.formatMessage(
                      messages.passwordPlaceholder,
                    )}
                    type="password"
                    value={this.state.password}
                  />
                </Set>
                <Set>
                  <SignInButton
                    disabled={pending}
                    onPress={this.auth(mutate)}
                    primary
                  />
                  <SignUpButton
                    disabled={pending}
                    onPress={this.auth(mutate, true)}
                  />
                </Set>
              </Form>
            </Box>
          </div>
        )}
      </Mutation>
    );
  }
}

export default injectIntl(Auth);
