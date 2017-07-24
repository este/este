// @flow
import type { CreatePost_viewer } from './__generated__/CreatePost_viewer.graphql';
import type { Dispatch, Form, State } from '../types';
import type { PostFormFields } from '../reducers/posts';
import AppError from './AppError';
import Box from './Box';
import TextInput from './TextInput';
import ValidationError from '../components/ValidationError';
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
    dispatch({ type: 'CREATE_POST', fields: form.fields, viewerId: viewer.id });
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
      <AppError error={form.appError} />
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
    }
  `,
);
