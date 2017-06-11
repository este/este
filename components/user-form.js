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

  // najdi prvni key, a...
  // dat name, at ho muzu najit na focus?
  // ale stejne nemam instanci, hmm
  // nejlepsi by bylo, mit to pres error
  // ale obecne, kazdej element?
  // hmm, vse je box, neco do boxu?

  return (
    <Form onSubmit={addUser}>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          maxLength={100}
          // universalni, ok
          // nebo autoFocus? hmm, asi jeste lepsi, tak
          autoFocus={validationErrors && validationErrors.name}
          value={form.name}
          onChange={set('name')}
          width={10}
          // tohle by slo, ok
          // error={[validationErrors, 'name']}
          error={<ValidationError prop="name" errors={validationErrors} />}
        />
        <TextInput
          label="Email"
          maxLength={100}
          onChange={set('email')}
          placeholder="jane@doe.com"
          value={form.email}
          width={10}
          autoFocus={validationErrors && validationErrors.email}
          error={<ValidationError prop="email" errors={validationErrors} />}
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
