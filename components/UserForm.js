// @flow
import type {
  State,
  Dispatch,
  Form as FormType,
  UserFormFields,
} from '../types';
import type { IntlShape } from 'react-intl';
import AppError from '../components/AppError';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Form from '../components/Form';
import Radio from '../components/Radio';
import Set from '../components/Set';
import TextInput from '../components/TextInput';
import ValidationError from '../components/ValidationError';
import gender from '../lib/users/gender';
import { AddButton } from '../components/buttons';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { initialFormId } from '../lib/form';
import { temp } from '../lib/temp';

const messages = defineMessages({
  name: {
    defaultMessage: 'Name',
    id: 'userForm.name',
  },
  namePlaceholder: {
    defaultMessage: 'Jane Doe',
    id: 'userForm.namePlaceholder',
  },
  email: {
    defaultMessage: 'Email',
    id: 'userForm.email',
  },
  emailPlaceholder: {
    defaultMessage: 'jane@doe.com',
    id: 'userForm.emailPlaceholder',
  },
  likesCats: {
    defaultMessage: 'Likes Cats',
    id: 'userForm.likesCats',
  },
  likesDogs: {
    defaultMessage: 'Likes Dogs',
    id: 'userForm.likesDogs',
  },
  female: {
    defaultMessage: 'Female',
    id: 'userForm.female',
  },
  male: {
    defaultMessage: 'Male',
    id: 'userForm.male',
  },
  other: {
    defaultMessage: 'Other',
    id: 'userForm.other',
  },
  agreedWithAnarchy: {
    defaultMessage: "I agree we don't need a king",
    id: 'userForm.agreedWithAnarchy',
  },
});

type UserFormProps = {
  intl: IntlShape,
  form: FormType<UserFormFields>,
  dispatch: Dispatch,
};

const UserForm = ({ intl, form, dispatch }: UserFormProps) => {
  const setUserForm = (prop: $Keys<UserFormFields>) => value => {
    dispatch({
      type: 'SET_USER_FORM',
      // $FlowFixMe Flow bug.
      fields: { ...form.fields, [prop]: value },
    });
  };
  const addUser = () => dispatch({ type: 'ADD_USER', fields: form.fields });
  const add10RandomUsers = () => dispatch({ type: 'ADD_10_RANDOM_USERS' });
  const disabled = temp(form.disabled);

  return (
    <Form onSubmit={addUser}>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only
          // for browser signIn form prefill.
          autoFocus={form.validationErrors.name}
          disabled={disabled}
          error={<ValidationError error={form.validationErrors.name} />}
          label={intl.formatMessage(messages.name)}
          onChange={setUserForm('name')}
          placeholder={intl.formatMessage(messages.namePlaceholder)}
          value={form.fields.name}
          width={10}
        />
        <TextInput
          autoFocus={form.validationErrors.email}
          disabled={disabled}
          error={<ValidationError error={form.validationErrors.email} />}
          label={intl.formatMessage(messages.email)}
          onChange={setUserForm('email')}
          placeholder={intl.formatMessage(messages.emailPlaceholder)}
          value={form.fields.email}
          width={10}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          disabled={disabled}
          label={intl.formatMessage(messages.likesCats)}
          onChange={setUserForm('likesCats')}
          value={form.fields.likesCats}
        />
        <Checkbox
          disabled={disabled}
          label={intl.formatMessage(messages.likesDogs)}
          onChange={setUserForm('likesDogs')}
          value={form.fields.likesDogs}
        />
      </Set>
      <Set>
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.female)}
          onChange={setUserForm('gender')}
          select={gender.female}
          value={form.fields.gender}
        />
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.male)}
          onChange={setUserForm('gender')}
          select={gender.male}
          value={form.fields.gender}
        />
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.other)}
          onChange={setUserForm('gender')}
          select={gender.other}
          value={form.fields.gender}
        />
      </Set>
      <Set vertical>
        <Checkbox
          autoFocus={form.validationErrors.isAnarchist}
          color="warning"
          disabled={disabled}
          label={intl.formatMessage(messages.agreedWithAnarchy)}
          labelOnLeft
          onChange={setUserForm('isAnarchist')}
          size={1}
          value={form.fields.isAnarchist}
        />
        <ValidationError error={form.validationErrors.isAnarchist} />
      </Set>
      <Set>
        <AddButton primary onPress={addUser} disabled={disabled} />
        <Button primary onPress={add10RandomUsers} disabled={disabled}>
          Add 10 random users
        </Button>
      </Set>
      <AppError error={form.appError} />
    </Form>
  );
};

export default connect(
  ({ users: { form } }: State, { id = initialFormId }) => ({
    form: form.changed[id] || form.initial,
  }),
)(UserForm);
