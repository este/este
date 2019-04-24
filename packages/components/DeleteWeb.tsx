import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'react-relay';
import { useConfirm } from '@app/hooks/useConfirm';
import { useMutation } from '@app/hooks/useMutation';
import { useAppHref } from '@app/hooks/useAppHref';
import { DeleteWebMutation } from '@app/relay/generated/DeleteWebMutation.graphql';
import { Button } from './Button';

const mutation = graphql`
  mutation DeleteWebMutation($input: DeleteWebInput!) {
    deleteWeb(input: $input) {
      web {
        id
      }
    }
  }
`;

interface DeleteWebProps {
  id: string;
}

export const DeleteWeb: FunctionComponent<DeleteWebProps> = ({ id }) => {
  const confirm = useConfirm();
  const { commit, pending } = useMutation<DeleteWebMutation>(mutation, { id });
  const appHref = useAppHref();

  const deleteWeb = () => {
    if (!confirm()) return;
    commit({
      onSuccess() {
        appHref.push({ pathname: '/' });
      },
    });
  };

  return (
    <Button type="danger" disabled={pending} onPress={deleteWeb}>
      <FormattedMessage id="deleteWebButton" defaultMessage="Delete Web" />
    </Button>
  );
};
