// @flow
import React from 'react';
import TextInput from './core/TextInput';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import { createFragmentContainer, graphql } from 'react-relay';
import type { PageTitle as Data } from './__generated__/PageTitle.graphql';
import useCommitLocalUpdate from '../hooks/useCommitLocalUpdate';
import { useSetPageTitleMutation } from '../mutations/SetPageTitleMutation';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'page title',
    id: 'pageTitle.textInput.placeholder',
  },
});

function PageTitle(props: { data: Data }) {
  const { data } = props;
  const intl = useIntl();
  const commitLocalUpdate = useCommitLocalUpdate();
  const [commit, errors] = useSetPageTitleMutation();

  function handleChangeText(text) {
    commitLocalUpdate(updater => {
      const record = updater.get(data.id);
      if (!record) return;
      record.setValue(text, 'draftTitle');
    });
  }

  function handleChangeTextThrottled(text) {
    const input = { id: data.id, title: text };
    commit(input);
  }

  return (
    <TextInput
      error={errors && errors.title}
      size={1}
      value={data.draftTitle}
      onChangeText={handleChangeText}
      onChangeTextThrottled={handleChangeTextThrottled}
      placeholder={intl.formatMessage(messages.placeholder)}
    />
  );
}

export default createFragmentContainer(
  PageTitle,
  graphql`
    fragment PageTitle on Page {
      id
      title @__clientField(handle: "draft")
      draftTitle
    }
  `,
);
