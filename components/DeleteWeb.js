// @flow
import React from 'react';
import { DeleteButton } from './core/buttons';
import useConfirm from '../hooks/useConfirm';
import Router from 'next/router';
import type { Href } from '../browser/sitemap';
import { useDeleteWebMutation } from '../mutations/DeleteWebMutation';

export default function DeleteWeb(props: {| id: string |}) {
  const confirm = useConfirm();
  const [commit, , pending] = useDeleteWebMutation();

  function onSuccess() {
    const href: Href = { pathname: '/' };
    // $FlowFixMe Wrong libdef.
    Router.replace(href);
  }

  function handleOnPress() {
    if (!confirm()) return;
    const input = { id: props.id };
    commit(input, onSuccess);
  }

  return (
    <DeleteButton color="danger" disabled={pending} onPress={handleOnPress} />
  );
}
