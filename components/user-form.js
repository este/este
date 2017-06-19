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

const UserForm = ({
  id,
  form,
  appError,
  validationErrors = {},
  disabled,
  dispatch,
}) => {
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
          // Note we are not using name attribute. It's useful probably only
          // for browser signIn form prefill.
          autoFocus={validationErrors.name}
          disabled={disabled}
          error={<ValidationError error={validationErrors.name} />}
          label="Name"
          onChange={set('name')}
          placeholder="Jane Doe"
          value={form.name}
          width={10}
        />
        <TextInput
          autoFocus={validationErrors.email}
          disabled={disabled}
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
          disabled={disabled}
          label="Likes cats"
          onChange={set('likesCats')}
          value={form.likesCats}
        />
        <Checkbox
          disabled={disabled}
          label="Likes dogs"
          onChange={set('likesDogs')}
          value={form.likesDogs}
        />
      </Set>
      <Set>
        <Radio
          disabled={disabled}
          label="Female"
          onChange={set('gender')}
          select="female"
          value={form.gender}
        />
        <Radio
          disabled={disabled}
          label="Male"
          onChange={set('gender')}
          select="male"
          value={form.gender}
        />
        <Radio
          disabled={disabled}
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
          disabled={disabled}
          label="I agree we don't need a king"
          labelOnLeft
          onChange={set('isAnarchist')}
          size={1}
          value={form.isAnarchist}
        />
        <ValidationError error={validationErrors.isAnarchist} />
      </Set>
      <Set>
        <Button primary onPress={addUser} disabled={disabled}>
          Add
        </Button>
        <Button primary onPress={add10RandomUsers} disabled={disabled}>
          Add 10 random users
        </Button>
      </Set>
      <AppError error={appError} />
    </Form>
  );
};

// connectForm?
export default connect(
  ({ users: { form } }: State, { id = newFormId }) => ({
    id,
    form: form.changed[id] || form.initial,
    appError: form.appError[id],
    validationErrors: form.validationErrors[id],
    disabled: form.disabled[id],
  }),
  // Inject dispatch with its type.
  (dispatch: Dispatch) => ({ dispatch }),
)(UserForm);
