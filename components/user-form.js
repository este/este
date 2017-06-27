// @flow
import type {
  State,
  Dispatch,
  UserForm as UserFormType,
  ValidationErrors,
} from '../types';
import type { IntlShape } from 'react-intl';
import AppError from '../components/app-error';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Radio from '../components/radio';
import Set from '../components/set';
import TextInput from '../components/text-input';
import ValidationError from '../components/validation-error';
import { AddButton } from '../components/buttons';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { newFormId } from '../lib/form';

type UserFormProps = {
  id: *,
  form: UserFormType,
  appError: *,
  validationErrors: ValidationErrors<UserFormType>,
  disabled: *,
  dispatch: Dispatch,
  intl: IntlShape,
};

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

const UserForm = ({
  id,
  form,
  appError,
  validationErrors = {},
  disabled,
  dispatch,
  intl,
}: UserFormProps) => {
  const set = (prop: $Keys<UserFormType>) => value => {
    dispatch({
      type: 'SET_USER_FORM',
      id,
      // $FlowFixMe I don't know how to get value type form prop. PR anyone?
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
          label={intl.formatMessage(messages.name)}
          onChange={set('name')}
          placeholder={intl.formatMessage(messages.namePlaceholder)}
          value={form.name}
          width={10}
        />
        <TextInput
          autoFocus={validationErrors.email}
          disabled={disabled}
          error={<ValidationError error={validationErrors.email} />}
          label={intl.formatMessage(messages.email)}
          onChange={set('email')}
          placeholder={intl.formatMessage(messages.emailPlaceholder)}
          value={form.email}
          width={10}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          disabled={disabled}
          label={intl.formatMessage(messages.likesCats)}
          onChange={set('likesCats')}
          value={form.likesCats}
        />
        <Checkbox
          disabled={disabled}
          label={intl.formatMessage(messages.likesDogs)}
          onChange={set('likesDogs')}
          value={form.likesDogs}
        />
      </Set>
      <Set>
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.female)}
          onChange={set('gender')}
          select="female"
          value={form.gender}
        />
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.male)}
          onChange={set('gender')}
          select="male"
          value={form.gender}
        />
        <Radio
          disabled={disabled}
          label={intl.formatMessage(messages.other)}
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
          label={intl.formatMessage(messages.agreedWithAnarchy)}
          labelOnLeft
          onChange={set('isAnarchist')}
          size={1}
          value={form.isAnarchist}
        />
        <ValidationError error={validationErrors.isAnarchist} />
      </Set>
      <Set>
        <AddButton primary onPress={addUser} disabled={disabled} />
        <Button primary onPress={add10RandomUsers} disabled={disabled}>
          Add 10 random users
        </Button>
      </Set>
      <AppError error={appError} />
    </Form>
  );
};

export default connect(({ users: { form } }: State, { id = newFormId }) => ({
  id,
  form: form.changed[id] || form.initial,
  appError: form.appError[id],
  validationErrors: form.validationErrors[id],
  disabled: form.disabled[id],
}))(UserForm);
