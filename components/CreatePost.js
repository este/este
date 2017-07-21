// @flow
import type { Dispatch, Form, PostFormFields, State } from '../types';
import Box from './Box';
import TextInput from './TextInput';
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
      // $FlowFixMe Flow bug.
      fields: { ...form.fields, [prop]: value },
    });
  };
  const handleSubmitEditing = () => {
    dispatch({ type: 'ADD_POST', fields: form.fields });
  };
  return (
    <Box marginBottom={1}>
      <TextInput
        disabled={disabled}
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
