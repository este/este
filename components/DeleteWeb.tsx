import Router from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'react-relay';
import { DeleteWebMutation } from '../generated/DeleteWebMutation.graphql';
import useConfirm from '../hooks/useConfirm';
import useMutation from '../hooks/useMutation';
import { AppHref } from '../pages/_app';
import Button from './Button';

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

const DeleteWeb: React.FunctionComponent<DeleteWebProps> = ({ id }) => {
  const confirm = useConfirm();
  const { commit, pending } = useMutation<DeleteWebMutation>(mutation, { id });

  const deleteWeb = () => {
    if (!confirm()) return;
    commit({
      onSuccess() {
        const href: AppHref = '/';
        Router.push(href);
      },
    });
  };

  return (
    <Button type="danger" disabled={pending} onPress={deleteWeb}>
      <FormattedMessage id="deleteWebButton" defaultMessage="Delete Web" />
    </Button>
  );
};

export default DeleteWeb;
