// @flow
import type { Dispatch, Form, State } from '../types';
import type { PostFormFields } from '../reducers/posts';
import Box from './Box';
import TextInput from './TextInput';
import ValidationError from '../components/ValidationError';
import { connect } from 'react-redux';
import { initialFormId } from '../lib/form';
import { temp } from '../lib/temp';

type CreatePostProps = {
  form: Form<PostFormFields>,
  dispatch: Dispatch,
};

const CreatePost = ({ form, dispatch }: CreatePostProps) => {
  const disabled = temp(form.disabled);
  const setPostForm = (prop: $Keys<PostFormFields>) => value => {
    dispatch({
      type: 'SET_POST_FORM',
      fields: { ...form.fields, [prop]: value },
    });
  };
  const handleSubmitEditing = () => {
    if (!form.fields.text.trim()) return;
    dispatch({ type: 'CREATE_POST', fields: form.fields });
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

export default connect(
  ({ posts: { form } }: State, { id = initialFormId }) => ({
    form: form.changed[id] || form.initial,
  }),
)(CreatePost);
