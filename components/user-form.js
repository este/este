// @flow
import type { State, Dispatch } from '../types';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Radio from '../components/radio';
import Set from '../components/set';
import TextInput from '../components/text-input';
import { addFormId } from '../lib/form';
import { connect } from 'react-redux';

const UserForm = ({ id, initialState, changedState, dispatch }) => {
  const form = changedState || initialState;
  // TODO: $Keys<typeof form> doesn't work. Why? Use generic? PR anyone?
  const set = (prop: $Keys<typeof form>) => value => {
    (dispatch: Dispatch)({
      type: 'SET_USER_FORM',
      id,
      form: { ...form, [prop]: value },
    });
  };
  const addUser = () => (dispatch: Dispatch)({ type: 'ADD_USER', form });
  const add10RandomUsers = () =>
    (dispatch: Dispatch)({ type: 'ADD_10_RANDOM_USERS' });

  return (
    <Form onSubmit={addUser}>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={set('name')}
          width={10}
          // error="Please enter your full name"
        />
        <TextInput
          label="Description"
          placeholder="..."
          value={form.description}
          onChange={set('description')}
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

export default connect(({ users: { form } }: State, { id = addFormId }) => ({
  id,
  initialState: form.initialState,
  changedState: form.changedState[id],
}))(UserForm);
