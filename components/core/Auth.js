// @flow
import * as React from 'react';
import Heading from './Heading';
import Form from './Form';
import TextInputBig from './TextInputBig';
import { SignInButton, SignUpButton } from './buttons';
import SigninMutation from '../../mutations/SigninMutation';
import SignupMutation from '../../mutations/SignupMutation';
import type { AuthInput } from '../../mutations/__generated__/SigninMutation.graphql';
import Router from 'next/router';
import Mutation from './Mutation';
import * as validation from '../../server/validation';
import { setCookie } from '../app/cookie';
import type { Errors } from '../../server/error';
import { defineMessages, type IntlShape } from 'react-intl';
import type { Href } from '../app/sitemap';
import withIntl from './withIntl';
import { View } from 'react-native';
import Row from './Row';
import Block from './Block';

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

type AuthState = {|
  inputErrors: Errors<AuthInput>,
  email: string,
  password: string,
|};

class Auth extends React.PureComponent<AuthProps, AuthState> {
  static initialState = {
    inputErrors: {},
    email: '',
    password: '',
  };

  state = Auth.initialState;

  // That's how we define event handlers.
  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });

  setFocusOnError(inputErrors: Errors<AuthInput>) {
    const error = Object.keys(inputErrors)[0];
    if (!error) return;
    let current;
    switch (error) {
      case 'email':
        current = this.emailRef.current;
        break;
      case 'password':
        current = this.passwordRef.current;
        break;
      default:
        (error: empty);
    }
    if (current) current.focus();
  }

  setErrors(inputErrors: Errors<AuthInput>) {
    this.setState({ inputErrors });
    this.setFocusOnError(inputErrors);
  }

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

  handleError = (inputErrors: *) => {
    this.setErrors(inputErrors);
  };

  auth = (mutate: *, isSignUp?: boolean) => () => {
    const input = {
      email: this.state.email,
      password: this.state.password,
    };

    const inputErrors = validation.validateEmailPassword(input);
    if (inputErrors) {
      this.setErrors(inputErrors);
      return;
    }

    if (isSignUp === true) {
      mutate(
        SignupMutation.commit,
        input,
        this.handleCompleted,
        this.handleError,
      );
    } else {
      mutate(
        SigninMutation.commit,
        input,
        this.handleCompleted,
        this.handleError,
      );
    }
  };

  emailRef = React.createRef();
  passwordRef = React.createRef();

  render() {
    const { intl } = this.props;
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <View>
            <Heading size={3}>Auth</Heading>
            <Form onSubmit={this.auth(mutate)}>
              <Block>
                <TextInputBig
                  autoComplete="email"
                  disabled={pending}
                  error={this.state.inputErrors.email}
                  keyboardType="email-address"
                  name="email"
                  onChangeText={this.setEmail}
                  placeholder={intl.formatMessage(messages.emailPlaceholder)}
                  value={this.state.email}
                  inputRef={this.emailRef}
                />
                <TextInputBig
                  disabled={pending}
                  error={this.state.inputErrors.password}
                  name="password"
                  onChangeText={this.setPassword}
                  placeholder={intl.formatMessage(messages.passwordPlaceholder)}
                  secureTextEntry
                  value={this.state.password}
                  inputRef={this.passwordRef}
                />
              </Block>
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
