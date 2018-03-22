// @flow
import * as React from 'react';
import Heading from './Heading';
import Form from './Form';
import TextInput from './TextInput';
import TextInputBig from './TextInputBig';
import Error from './Error';
import { SignInButton, SignUpButton } from './buttons';
import SigninMutation from '../../mutations/SigninMutation';
import SignupMutation from '../../mutations/SignupMutation';
import Router from 'next/router';
import Mutation from './Mutation';
import * as validation from '../../server/validation';
import { setCookie } from '../app/cookie';
import type { Errors } from '../../server/error';
import { defineMessages, type IntlShape } from 'react-intl';
import type { Href } from '../app/sitemap';
import withIntl from './withIntl';
import { StyleSheet, View } from 'react-native';
import Row from './Row';

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'auth.emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'auth.passwordPlaceholder',
  },
});

type AuthProps = {|
  redirectUrl?: Href,
  intl: IntlShape,
|};

type Fields = {|
  email: string,
  password: string,
|};

type AuthState = {|
  ...Fields,
  errors: Errors<Fields>,
|};

// https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete/32505530#32505530
const DisableWebkitAutofillColor = () => (
  <style jsx global>{`
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
      -webkit-transition-delay: 9999s;
    }
  `}</style>
);

class Auth extends React.PureComponent<AuthProps, AuthState> {
  static initialState = {
    email: '',
    password: '',
    errors: {},
  };

  state = Auth.initialState;

  handleCompleted = (response: *) => {
    // http://graphql.org/learn/best-practices/#nullability
    const payload = response.signin || response.signup || null;
    // https://flow.org/en/docs/lang/refinements
    if (payload == null) return;
    const { token } = payload;
    setCookie({ token });
    if (Router.query.redirectUrl) {
      Router.replace(Router.query.redirectUrl);
    } else if (this.props.redirectUrl) {
      Router.replace(this.props.redirectUrl);
    } else {
      Router.replace({
        pathname: Router.pathname,
        query: Router.query,
      });
    }
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
    const { intl } = this.props;
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <View>
            <DisableWebkitAutofillColor />
            <Heading size={3}>Auth</Heading>
            <Form onSubmit={this.auth(mutate)}>
              <TextInputBig
                autoComplete="email"
                // autoFocus={this.state.errors.email}
                disabled={pending}
                error={<Error>{this.state.errors.email}</Error>}
                keyboardType="email-address"
                name="email"
                onChangeText={email => this.setState({ email })}
                placeholder={intl.formatMessage(messages.emailPlaceholder)}
                value={this.state.email}
              />
              <TextInputBig
                // autoFocus={this.state.errors.password}
                disabled={pending}
                error={<Error>{this.state.errors.password}</Error>}
                name="password"
                onChangeText={password => this.setState({ password })}
                placeholder={intl.formatMessage(messages.passwordPlaceholder)}
                secureTextEntry
                value={this.state.password}
              />
              <Row>
                <SignInButton
                  disabled={pending}
                  onPress={this.auth(mutate)}
                  color="primary"
                />
                <SignUpButton
                  disabled={pending}
                  onPress={this.auth(mutate, true)}
                />
              </Row>
            </Form>
          </View>
        )}
      </Mutation>
    );
  }
}

export default withIntl(Auth);
