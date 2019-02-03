import validateSignIn from '@este/api/validators/validateSignIn';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Platform, TextInput, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Button from '../components/Button';
import Layout from '../components/Layout';
import ValidationError from '../components/ValidationError';
import { signinMutation } from '../generated/signinMutation.graphql';
import { signinQuery } from '../generated/signinQuery.graphql';
import useAppContext from '../hooks/useAppContext';
import useAuth from '../hooks/useAuth';
import useMutation from '../hooks/useMutation';
import { pageTitles } from './_app';

const mutation = graphql`
  mutation signinMutation($input: SignInInput!) {
    signIn(input: $input) {
      token
      errors {
        email
        password
      }
    }
  }
`;

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'passwordPlaceholder',
  },
});

interface SignIn {
  data: signinQuery;
}

const SignIn: React.FunctionComponent<SignIn> = ({ data }) => {
  const { intl, theme } = useAppContext();
  const auth = useAuth();
  const { fields, commit, errors, pending } = useMutation<signinMutation>(
    mutation,
    {
      createAccount: false,
      email: '',
      password: '',
    },
    { validator: validateSignIn },
  );

  const signIn = (createAccount = false) => {
    commit({
      merge: { createAccount },
      onSuccess({ token }) {
        if (token == null) return;
        auth.signIn(token);
      },
    });
  };

  return (
    <Layout title={intl.formatMessage(pageTitles.signIn)} data={data}>
      <TextInput
        {...fields.email.textInput}
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        keyboardType="email-address"
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'email', autoComplete: 'email' },
        })}
      />
      <ValidationError error={errors.email} />
      <TextInput
        {...fields.password.textInput}
        placeholder={intl.formatMessage(messages.passwordPlaceholder)}
        secureTextEntry
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'password' },
        })}
      />
      <ValidationError error={errors.password} />
      <View style={theme.buttons}>
        <Button type="primary" onPress={() => signIn()} disabled={pending}>
          <FormattedMessage defaultMessage="Sign In" id="signIn" />
        </Button>
        <Button
          type="secondary"
          onPress={() => signIn(true)}
          disabled={pending}
        >
          <FormattedMessage defaultMessage="Sign Up" id="signUp" />
        </Button>
      </View>
    </Layout>
  );
};

export default createFragmentContainer(
  SignIn,
  graphql`
    fragment signinQuery on Query {
      ...LayoutQuery
    }
  `,
);
