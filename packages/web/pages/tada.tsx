import { validateUpdateTada } from '@app/api/validators/validateTada';
import React, { FunctionComponent } from 'react';
import { TextInput, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { useMutation } from '@app/hooks/useMutation';
import { useViewerAccessibleTadaUpdatedSubscription } from '@app/hooks/useViewerAccessibleTadaUpdatedSubscription';
import { DeleteTada } from '@app/components/DeleteTada';
import { Layout } from '@app/components/Layout';
import { SaveButton } from '@app/components/SaveButton';
import { ValidationError } from '@app/components/ValidationError';
import { tadaMutation } from '@app/relay/generated/tadaMutation.graphql';
import { tada_data } from '@app/relay/generated/tada_data.graphql';

const mutation = graphql`
  mutation tadaMutation($input: TadaUpdateInput!) {
    updateTada(input: $input) {
      errors {
        name
      }
      tada {
        id
        name
      }
    }
  }
`;

interface TadaProps {
  data: tada_data;
}

const Tada: FunctionComponent<TadaProps> = ({ data }) => {
  const { tada } = data;
  const { theme } = useAppContext();
  const { fields, commit, errors, pending, state } = useMutation<tadaMutation>(
    mutation,
    { id: tada.id, name: tada.name },
    { validator: validateUpdateTada },
  );
  useViewerAccessibleTadaUpdatedSubscription();

  return (
    <Layout title={tada.name} data={data}>
      <TextInput
        {...fields.name.textInput}
        style={theme.textInputOutline}
        onSubmitEditing={() => commit()}
      />
      <ValidationError error={errors.name} />
      <View style={theme.buttons}>
        <SaveButton
          disabled={pending}
          saved={state.name === tada.name}
          onPress={() => commit()}
        />
        <DeleteTada id={tada.id} />
      </View>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default createFragmentContainer(Tada, {
  data: graphql`
    fragment tada_data on Query @argumentDefinitions(id: { type: "ID!" }) {
      ...Layout_data
      tada(id: $id) {
        name
        id
      }
    }
  `,
});
