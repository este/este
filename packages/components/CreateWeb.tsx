import validateCreateWeb from '@app/api/validators/validateCreateWeb';
import React from 'react';
import { defineMessages } from 'react-intl';
import { TextInput, View } from 'react-native';
import { graphql } from 'react-relay';
import useAppContext from '@app/hooks/useAppContext';
import useMutation from '@app/hooks/useMutation';
import useAppHref from '@app/hooks/useAppHref';
import { CreateWebMutation } from '@app/relay/generated/CreateWebMutation.graphql';
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
  const appHref = useAppHref();

  const createWeb = () => {
    commit({
      onSuccess({ web }) {
        if (web == null) return;
        appHref.push({
          pathname: '/web',
          query: { id: web.id },
        });
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
