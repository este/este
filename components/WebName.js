// @flow
import React from 'react';
import TextInput from './core/TextInput';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import { createFragmentContainer, graphql } from 'react-relay';
import type { WebName as Data } from './__generated__/WebName.graphql';
import useCommitLocalUpdate from '../hooks/useCommitLocalUpdate';
import { useSetWebNameMutation } from '../mutations/SetWebNameMutation';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'web name',
    id: 'webName.textInput.placeholder',
  },
});

function WebName(props: { data: Data }) {
  const { data } = props;
  const intl = useIntl();
  const commitLocalUpdate = useCommitLocalUpdate();
  const [commit, errors] = useSetWebNameMutation();

  function handleChangeText(text) {
    commitLocalUpdate(updater => {
      const record = updater.get(data.id);
      if (!record) return;
      record.setValue(text, 'draftName');
    });
  }

  function handleChangeTextThrottled(text) {
    const input = { id: data.id, name: text };
    commit(input);
  }

  return (
    <TextInput
      error={errors && errors.name}
      size={1}
      value={data.draftName}
      onChangeText={handleChangeText}
      onChangeTextThrottled={handleChangeTextThrottled}
      placeholder={intl.formatMessage(messages.placeholder)}
    />
  );
}

export default createFragmentContainer(
  WebName,
  graphql`
    fragment WebName on Web {
      id
      name @__clientField(handle: "draft")
      draftName
    }
  `,
);
