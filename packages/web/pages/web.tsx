import { validateCreateWeb } from '@app/api/validators/validateCreateWeb';
import React, { FunctionComponent } from 'react';
import { TextInput, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { useMutation } from '@app/hooks/useMutation';
import { DeleteWeb } from '@app/components/DeleteWeb';
import { Layout } from '@app/components/Layout';
import { SaveButton } from '@app/components/SaveButton';
import { ValidationError } from '@app/components/ValidationError';
import { webMutation } from '@app/relay/generated/webMutation.graphql';
import { web_data } from '@app/relay/generated/web_data.graphql';

const mutation = graphql`
  mutation webMutation($input: UpdateWebInput!) {
    updateWeb(input: $input) {
      errors {
        name
      }
      web {
        id
        name
      }
    }
  }
`;

interface WebProps {
  data: web_data;
}

const Web: FunctionComponent<WebProps> = ({ data }) => {
  const { web } = data;
  const { theme } = useAppContext();
  const { fields, commit, errors, pending, state } = useMutation<webMutation>(
    mutation,
    { id: web.id, name: web.name },
    { validator: validateCreateWeb },
  );

  return (
    <Layout title={web.name} data={data}>
      <TextInput
        {...fields.name.textInput}
        style={theme.textInputOutline}
        onSubmitEditing={() => commit()}
      />
      <ValidationError error={errors.name} />
      <View style={theme.buttons}>
        <SaveButton
          disabled={pending}
          saved={state.name === web.name}
          onPress={() => commit()}
        />
        <DeleteWeb id={web.id} />
      </View>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default createFragmentContainer(Web, {
  data: graphql`
    fragment web_data on Query @argumentDefinitions(id: { type: "ID!" }) {
      ...Layout_data
      web(id: $id) {
        name
        id
      }
    }
  `,
});
