// @flow
import type { State, Dispatch } from '../types';
import AppError from '../components/app-error';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Radio from '../components/radio';
import Set from '../components/set';
import TextInput from '../components/text-input';
import ValidationError from '../components/validation-error';
import { addFormId } from '../lib/form';
import { connect } from 'react-redux';

const UserForm = ({ id, form, validationErrors, error, dispatch }) => {
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
          // browser auth pre-filling. Also, name prop is not universal.
          autoFocus={validationErrors && validationErrors.name}
          error={<ValidationError prop="name" errors={validationErrors} />}
          label="Name"
          maxLength={100}
          onChange={set('name')}
          placeholder="Jane Doe"
          value={form.name}
          width={10}
        />
        <TextInput
          autoFocus={validationErrors && validationErrors.email}
          error={<ValidationError prop="email" errors={validationErrors} />}
          label="Email"
          maxLength={100}
          onChange={set('email')}
          placeholder="jane@doe.com"
          value={form.email}
          width={10}
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
          // focus={validationErrors.wantsKing}
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
      <AppError error={error} />
    </Form>
  );
};

export default connect(
  ({ users: { form } }: State, { id = addFormId }) => ({
    id,
    form: form.changed[id] || form.initial,
    validationErrors: form.validationErrors[id],
    error: form.error[id],
  }),
  // Inject dispatch with its type.
  (dispatch: Dispatch) => ({ dispatch })
)(UserForm);
