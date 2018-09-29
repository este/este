// @flow
import * as React from 'react';
import Heading from './Heading';
import TextInput from './TextInput';
import { SignInButton, SignUpButton } from './buttons';
import Router from 'next/router';
import withMutation from './withMutation';
import { setCookie } from '../../browser/cookie';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import type { Href } from '../../browser/sitemap';
import Row from './Row';
import Block from './Block';
import * as validations from '../../validations';
import { View } from 'react-native';
import { pipe } from 'ramda';
import AuthMutation, {
  type AuthCommit,
  type AuthErrors,
} from '../../mutations/AuthMutation';

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
  commit: AuthCommit,
  pending: boolean,
|};

type AuthState = {|
  errors: AuthErrors,
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

  handleSignIn = () => {
    this.auth(false);
  };

  handleSignUp = () => {
    this.auth(true);
  };

  auth(isSignUp: boolean) {
    const input = {
      email: this.state.email,
      password: this.state.password,
      isSignUp,
    };

    const errors = validations.validateAuth(input);
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.props.commit(input, this.handleCompleted);
  }

  render() {
    const { intl } = this.props;
    const { errors } = this.state;
    return (
      <View>
        <Heading size={1}>Auth</Heading>
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
            onSubmitEditing={this.handleSignIn}
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
            onSubmitEditing={this.handleSignIn}
          />
          <Row>
            <SignInButton
              disabled={this.props.pending}
              onPress={this.handleSignIn}
              color="primary"
            />
            <SignUpButton
              disabled={this.props.pending}
              onPress={this.handleSignUp}
              color="primary"
            />
          </Row>
        </Block>
      </View>
    );
  }
}

export default pipe(
  injectIntl,
  withMutation(AuthMutation),
)(Auth);
