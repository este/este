// @flow
import type { State } from '../types';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Form from '../components/form';
import Radio from '../components/radio';
import Set from '../components/set';
import TextInput from '../components/text-input';
import { addFormId } from '../lib/form';
import { connect } from 'react-redux';
import { setUserForm, addUser, add100RandomUsers } from '../lib/users/actions';

const UserForm = ({ id, form, setUserForm, addUser, add100RandomUsers }) => {
  // TODO: form/createOnChange
  const onChange = (prop: $Keys<typeof form>) => value => {
    setUserForm(id, { ...form, [(prop: string)]: value });
  };
  const onSubmit = () => {
    addUser(form);
  };

  return (
    <Form>
      <Set vertical>
        <TextInput
          // Note we are not using name attribute. It's useful probably only for
          // browser auth pre-filling. Also, it's not universal.
          label="Name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={onChange('name')}
          // error="Please enter your full name"
        />
        <TextInput
          label="Description"
          placeholder="..."
          value={form.description}
          onChange={onChange('description')}
        />
      </Set>
      <Set vertical spaceBetween={0}>
        <Checkbox
          label="Likes cats"
          value={form.likesCats}
          onChange={onChange('likesCats')}
        />
        <Checkbox
          label="Likes dogs"
          value={form.likesDogs}
          onChange={onChange('likesDogs')}
        />
      </Set>
      <Set>
        <Radio
          label="Female"
          select="female"
          value={form.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={form.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={form.gender}
          onChange={onChange('gender')}
        />
      </Set>
      <Set>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={form.wantsKing}
          onChange={onChange('wantsKing')}
        />
      </Set>
      <Set>
        <Button
          primary
          onPress={onSubmit}
          type="submit" // Submit on key enter in browser. TODO: React Native?
        >
          Add
        </Button>
        <Button primary onPress={add100RandomUsers}>
          Add 100 random users
        </Button>
      </Set>
    </Form>
  );
};

export default connect(
  ({ users: { form } }: State, { id = addFormId }) => ({
    id,
    form: form.changedState[id] || form.initialState,
  }),
  { setUserForm, addUser, add100RandomUsers }
)(UserForm);
