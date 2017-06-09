// @flow
import type { State, Dispatch } from '../types';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Radio from '../components/radio';
import Set from '../components/set';
import TextInput from '../components/text-input';
import ValidationError from '../components/validation-error';
import { addFormId } from '../lib/form';
import { connect } from 'react-redux';

const UserForm = ({ id, form, errors, dispatch }) => {
  // For some reason, prop must be string for 100% Flow coverage.
  const set = (prop: string) => value => {
    dispatch({
      type: 'SET_USER_FORM',
      id,
      form: { ...form, [prop]: value },
    });
  };
  const addUser = () => dispatch({ type: 'ADD_USER', form });
  const add10RandomUsers = () => dispatch({ type: 'ADD_10_RANDOM_USERS' });

  return (
    <Form onSubmit={addUser}>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          maxLength={100}
          value={form.name}
          onChange={set('name')}
          width={10}
          error={<ValidationError prop="name" errors={errors} />}
        />
        <TextInput
          label="Description"
          maxLength={100}
          onChange={set('description')}
          placeholder="..."
          value={form.description}
          width={10}
          error={<ValidationError prop="description" errors={errors} />}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          label="Likes cats"
          value={form.likesCats}
          onChange={set('likesCats')}
        />
        <Checkbox
          label="Likes dogs"
          value={form.likesDogs}
          onChange={set('likesDogs')}
        />
      </Set>
      <Set>
        <Radio
          label="Female"
          select="female"
          value={form.gender}
          onChange={set('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={form.gender}
          onChange={set('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={form.gender}
          onChange={set('gender')}
        />
      </Set>
      <Set>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={form.wantsKing}
          onChange={set('wantsKing')}
        />
      </Set>
      <Set>
        <Button primary onPress={addUser}>
          Add
        </Button>
        <Button primary onPress={add10RandomUsers}>
          Add 10 random users
        </Button>
      </Set>
    </Form>
  );
};

export default connect(
  ({ users: { form } }: State, { id = addFormId }) => ({
    id,
    form: form.changed[id] || form.initial,
    errors: form.errors[id],
  }),
  // Trick to inject dispatch type. Flow is both awesome and terrible.
  (dispatch: Dispatch) => ({ dispatch })
)(UserForm);
