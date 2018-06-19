// @flow
import * as React from 'react';
import Heading from './Heading';
import Form from './Form';
import TextInput from './TextInput';
import { SignInButton, SignUpButton } from './buttons';
import Router from 'next/router';
import withMutation, { type Commit, type Errors } from './withMutation';
import { setCookie } from '../app/cookie';
import { defineMessages, type IntlShape } from 'react-intl';
import type { Href } from '../app/sitemap';
import withIntl from './withIntl';
import Row from './Row';
import Block from './Block';
import { graphql } from 'react-relay';
import * as generated from './__generated__/AuthMutation.graphql';
import { validateAuth } from '../../server/api/resolvers/Mutation.mjs';
import { View } from 'react-native';

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
  commit: Commit<generated.AuthInput, generated.AuthMutationResponse>,
  pending: boolean,
|};

type AuthState = {|
  errors: Errors<generated.AuthMutationResponse, 'auth'>,
  email: string,
  password: string,
|};

class Auth extends React.PureComponent<AuthProps, AuthState> {
  static initialState = {
    errors: null,
    email: '',
    password: '',
  };

  state = Auth.initialState;

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });

  handleCompleted = ({ auth }) => {
    if (!auth) return;
    if (auth.errors) {
      this.setState({ errors: auth.errors });
      return;
    }
    const { token } = auth;
    if (token == null) return;
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

  auth(isSignUp: boolean) {
    const input = {
      email: this.state.email,
      password: this.state.password,
      isSignUp,
    };

    const errors = validateAuth(input);
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.props.commit(input, this.handleCompleted);
  }

  signIn = () => this.auth(false);
  signUp = () => this.auth(true);

  render() {
    const { intl } = this.props;
    const { errors } = this.state;
    return (
      <View>
        <Heading size={1}>Auth</Heading>
        <Form>
          <Block>
            <TextInput
              autoComplete="email"
              disabled={this.props.pending}
              error={errors && errors.email}
              focusOnError={errors}
              keyboardType="email-address"
              name="email"
              onChangeText={this.setEmail}
              placeholder={intl.formatMessage(messages.emailPlaceholder)}
              value={this.state.email}
              onSubmitEditing={this.signIn}
            />
            <TextInput
              disabled={this.props.pending}
              error={errors && errors.password}
              focusOnError={errors}
              name="password"
              onChangeText={this.setPassword}
              placeholder={intl.formatMessage(messages.passwordPlaceholder)}
              secureTextEntry
              value={this.state.password}
              onSubmitEditing={this.signIn}
            />
          </Block>
          <Row>
            <SignInButton
              disabled={this.props.pending}
              onPress={this.signIn}
              color="primary"
            />
            <SignUpButton disabled={this.props.pending} onPress={this.signUp} />
          </Row>
        </Form>
      </View>
    );
  }
}

export default withMutation(
  withIntl(Auth),
  graphql`
    mutation AuthMutation($input: AuthInput!) {
      auth(input: $input) {
        token
        errors {
          email
          password
        }
      }
    }
  `,
);
