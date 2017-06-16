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
import { connect } from 'react-redux';
import { newFormId } from '../lib/form';

const UserForm = ({ id, form, validationErrors = {}, error, dispatch }) => {
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

  // That's how we can render validation error immediately.
  const nameMaxLengthValidationError = null;

  return (
    <Form onSubmit={addUser}>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only
          // for browser signIn form prefill.
          autoFocus={validationErrors.name}
          error={
            <ValidationError
              error={nameMaxLengthValidationError || validationErrors.name}
            />
          }
          label="Name"
          onChange={set('name')}
          placeholder="Jane Doe"
          value={form.name}
          width={10}
        />
        <TextInput
          autoFocus={validationErrors.email}
          error={<ValidationError error={validationErrors.email} />}
          label="Email"
          onChange={set('email')}
          placeholder="jane@doe.com"
          value={form.email}
          width={10}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          label="Likes cats"
          onChange={set('likesCats')}
          value={form.likesCats}
        />
        <Checkbox
          label="Likes dogs"
          onChange={set('likesDogs')}
          value={form.likesDogs}
        />
      </Set>
      <Set>
        <Radio
          label="Female"
          onChange={set('gender')}
          select="female"
          value={form.gender}
        />
        <Radio
          label="Male"
          onChange={set('gender')}
          select="male"
          value={form.gender}
        />
        <Radio
          label="Other"
          onChange={set('gender')}
          select="other"
          value={form.gender}
        />
      </Set>
      <Set vertical>
        <Checkbox
          autoFocus={validationErrors.isAnarchist}
          color="warning"
          label="I agree we don't need a king"
          labelOnLeft
          onChange={set('isAnarchist')}
          size={1}
          value={form.isAnarchist}
        />
        <ValidationError error={validationErrors.isAnarchist} />
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
  ({ users: { form } }: State, { id = newFormId }) => ({
    id,
    form: form.changed[id] || form.initial,
    validationErrors: form.validationErrors[id],
    error: form.error[id],
  }),
  // Inject dispatch with its type.
  (dispatch: Dispatch) => ({ dispatch })
)(UserForm);
