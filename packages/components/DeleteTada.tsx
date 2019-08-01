import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'react-relay';
import { useConfirm } from '@app/hooks/useConfirm';
import { useMutation } from '@app/hooks/useMutation';
import { useAppHref } from '@app/hooks/useAppHref';
import { DeleteTadaMutation } from '@app/relay/generated/DeleteTadaMutation.graphql';
import { Button } from './Button';

const mutation = graphql`
  mutation DeleteTadaMutation($input: TadaDeleteInput!) {
    deleteTada(input: $input) {
      tada {
        id
      }
    }
  }
`;

interface DeleteTadaProps {
  id: string;
}

export const DeleteTada: FunctionComponent<DeleteTadaProps> = ({ id }) => {
  const confirm = useConfirm();
  const { commit, pending } = useMutation<DeleteTadaMutation>(mutation, { id });
  const appHref = useAppHref();

  const deleteTada = () => {
    if (!confirm()) return;
    commit({
      onSuccess() {
        appHref.push({ pathname: '/' });
      },
    });
  };

  return (
    <Button type="danger" disabled={pending} onPress={deleteTada}>
      <FormattedMessage id="deleteTadaButton" defaultMessage="Delete Tada" />
    </Button>
  );
};
