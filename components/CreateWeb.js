// @flow
import React, { useState } from 'react';
import TextInput from './core/TextInput';
import Row from './core/Row';
import { CreateButton } from './core/buttons';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import { useCreateWebMutation } from '../mutations/CreateWebMutation';
import Router from 'next/router';
import type { Href } from '../browser/sitemap';

export const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Home',
    id: 'createWeb.pageTitle',
  },
  label: {
    defaultMessage: 'Web Name',
    id: 'createWeb.name.label',
  },
});

export default function CreateWeb() {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [commit, pending, errors] = useCreateWebMutation();

  function onSuccess(createWeb) {
    const { pageId } = createWeb;
    // Anything can fail, endpoint can be updated, this is fine.
    if (pageId == null) return;
    setDisabled(true);
    const href: Href = {
      pathname: '/editor',
      query: { id: pageId },
    };
    // $FlowFixMe Wrong libdef.
    Router.push(href);
  }

  function createWeb() {
    const input = { name, pageTitle: intl.formatMessage(messages.pageTitle) };
    commit(input, onSuccess);
  }

  return (
    <>
      <TextInput
        label={intl.formatMessage(messages.label)}
        disabled={disabled || pending}
        error={errors && errors.name}
        focusOnError={errors}
        onChangeText={setName}
        value={name}
        onSubmitEditing={createWeb}
        placeholder="…"
      />
      <Row>
        <CreateButton
          color="primary"
          disabled={disabled || pending}
          onPress={createWeb}
        />
      </Row>
    </>
  );
}
