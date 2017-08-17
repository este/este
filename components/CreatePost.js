// @flow
import React from 'react';
import type { CreatePost_viewer } from './__generated__/CreatePost_viewer.graphql';
import type { Dispatch, Form, State } from '../types';
import type { PostFormFields } from '../reducers/posts';
import Box from './Box';
import TextInput from './TextInput';
import ValidationError from './ValidationError';
import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';
import { initialFormId } from '../lib/form';
import { temp } from '../lib/temp';

type CreatePostProps = {
  form: Form<PostFormFields>,
  dispatch: Dispatch,
  viewer: CreatePost_viewer,
};

let CreatePost = ({ form, dispatch, viewer }: CreatePostProps) => {
  const disabled = temp(form.disabled);
  const setPostForm = (prop: $Keys<PostFormFields>) => value => {
    dispatch({
      type: 'SET_POST_FORM',
      fields: { ...form.fields, [prop]: value },
    });
  };
  const handleSubmitEditing = () => {
    if (!form.fields.text.trim()) return;
    // Type refinement. I'm not sure why Relay Modern generated types are
    // nullable, but they are.
    if (!viewer.user) return;
    dispatch({
      type: 'CREATE_POST',
      fields: form.fields,
      // For some reason, viewer.id is always constant while user.id is logged
      // in user id. Mutation needs both. It's probably pattern for not
      // authenticated users.
      viewerId: viewer.id,
      // https://www.graph.cool/forum/t/specify-permissions-for-create-actions/387/2
      // To test, try to pass wrong authorId.
      // authorId: 'cj5zs6bui2d2g0145icd8kgls',
      authorId: viewer.user.id,
    });
  };
  return (
    <Box marginBottom={1}>
      <TextInput
        autoFocus={form.validationErrors.text}
        disabled={disabled}
        error={<ValidationError error={form.validationErrors.text} />}
        label="New Post"
        onChange={setPostForm('text')}
        onSubmitEditing={handleSubmitEditing}
        placeholder="Say thing"
        value={form.fields.text}
      />
    </Box>
  );
};

CreatePost = connect(({ posts: { form } }: State, { id = initialFormId }) => ({
  form: form.changed[id] || form.initial,
}))(CreatePost);

export default createFragmentContainer(
  CreatePost,
  graphql`
    fragment CreatePost_viewer on Viewer {
      id
      user {
        id
      }
    }
  `,
);
