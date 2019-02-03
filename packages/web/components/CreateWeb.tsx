import validateCreateWeb from '@este/api/validators/validateCreateWeb';
import Router from 'next/router';
import React from 'react';
import { defineMessages } from 'react-intl';
import { TextInput, View } from 'react-native';
import { graphql } from 'react-relay';
import { CreateWebMutation } from '../generated/CreateWebMutation.graphql';
import useAppContext from '../hooks/useAppContext';
import useMutation from '../hooks/useMutation';
import { AppHref } from '../pages/_app';
import Button from './Button';
import ValidationError from './ValidationError';

const messages = defineMessages({
  createWebButton: {
    defaultMessage: 'Create Web',
    id: 'createWebButton',
  },
  namePlaceholder: {
    defaultMessage: 'name',
    id: 'namePlaceholder',
  },
});

const mutation = graphql`
  mutation CreateWebMutation($input: CreateWebInput!) {
    createWeb(input: $input) {
      web {
        id
      }
      errors {
        name
      }
    }
  }
`;

const CreateWeb: React.FunctionComponent = () => {
  const { intl, theme } = useAppContext();
  const { fields, commit, errors, pending } = useMutation<CreateWebMutation>(
    mutation,
    { name: '' },
    { validator: validateCreateWeb },
  );

  const createWeb = () => {
    commit({
      onSuccess({ web }) {
        if (web == null) return;
        const href: AppHref = {
          pathname: '/web',
          query: { id: web.id },
        };
        Router.push(href);
      },
    });
  };

  return (
    <>
      <TextInput
        {...fields.name.textInput}
        style={theme.text}
        placeholder={intl.formatMessage(messages.namePlaceholder)}
        onSubmitEditing={createWeb}
      />
      <ValidationError error={errors.name} />
      <View style={theme.buttons}>
        <Button type="text" disabled={pending} onPress={createWeb}>
          {intl.formatMessage(messages.createWebButton)}
        </Button>
      </View>
    </>
  );
};

export default CreateWeb;
