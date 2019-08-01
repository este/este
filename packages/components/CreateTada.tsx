import { validateCreateTada } from '@app/api/validators/validateTada';
import React, { FunctionComponent } from 'react';
import { defineMessages } from 'react-intl';
import { TextInput, View } from 'react-native';
import { graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { useMutation } from '@app/hooks/useMutation';
import { CreateTadaMutation } from '@app/relay/generated/CreateTadaMutation.graphql';
import { Button } from './Button';
import { ValidationError } from './ValidationError';

const messages = defineMessages({
  createTadaButton: {
    defaultMessage: 'Create Tada',
    id: 'createTadaButton',
  },
  namePlaceholder: {
    defaultMessage: 'name',
    id: 'namePlaceholder',
  },
});

const mutation = graphql`
  mutation CreateTadaMutation($input: TadaCreateInput!) {
    createTada(input: $input) {
      tada {
        id
      }
      errors {
        name
      }
    }
  }
`;

export const CreateTada: FunctionComponent = () => {
  const { intl, theme } = useAppContext();
  const { fields, commit, errors, pending } = useMutation<CreateTadaMutation>(
    mutation,
    { name: '' },
    { validator: validateCreateTada },
  );
  // const appHref = useAppHref();

  const createTada = () => {
    commit({
      onSuccess({ errors }) {
        if (errors != null) return;
        fields.name.textInput.onChangeText('');
        // appHref.push({
        //   pathname: '/tada',
        //   query: { id: tada.id },
        // });
      },
    });
  };

  return (
    <>
      <TextInput
        {...fields.name.textInput}
        style={theme.text}
        placeholder={intl.formatMessage(messages.namePlaceholder)}
        onSubmitEditing={createTada}
      />
      <ValidationError error={errors.name} />
      <View style={theme.buttons}>
        <Button type="text" disabled={pending} onPress={createTada}>
          {intl.formatMessage(messages.createTadaButton)}
        </Button>
      </View>
    </>
  );
};
