// @flow
import type { State } from '../types';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Fieldset from '../components/fieldset';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import Radio from '../components/radio';
import TextInput from '../components/text-input';
import app from '../components/app';
import { connect } from 'react-redux';
import { setUserForm } from '../lib/forms/actions';

const UserForm = ({ id, user, setUserForm }) => {
  // TODO: set and submit and connect as well could be abstracted.
  const set = prop => state => setUserForm(id, { ...user, [prop]: state });
  const reset = () => setUserForm(id, null);
  const submit = () => {
    // eslint-disable-next-line no-console
    console.log(user);
    // reset after save
    reset();
  };
  return (
    <Form>
      <TextInput
        // Note we are not using name attribute. It's useful probably only for
        // browser auth pre-filling. Also, it's not universal.
        label="Name"
        placeholder="Jane Doe"
        value={user.name}
        onChange={set('name')}
      />
      <TextInput
        label="Description"
        placeholder="..."
        value={user.description}
        onChange={set('description')}
      />
      <Fieldset vertical>
        <Checkbox
          label="I like cats"
          value={user.likesCats}
          onChange={set('likesCats')}
        />
        <Checkbox
          label="I like dogs"
          value={user.likesDogs}
          onChange={set('likesDogs')}
        />
      </Fieldset>
      <Fieldset>
        <Radio
          label="Female"
          select="female"
          value={user.gender}
          onChange={set('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={user.gender}
          onChange={set('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={user.gender}
          onChange={set('gender')}
        />
      </Fieldset>
      <Fieldset>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={user.wantsKing}
          onChange={set('wantsKing')}
        />
      </Fieldset>
      <Fieldset>
        <Button
          primary
          onPress={submit}
          type="submit" // Submit on key enter in browser. TODO: React Native.
        >
          Submit
        </Button>
      </Fieldset>
    </Form>
  );
};

const EditableUserForm = connect(
  ({ forms: { user } }: State, { id = '' }) => ({
    id,
    user: user.changedState[id] || user.initialState,
  }),
  { setUserForm }
)(UserForm);

const Forms = () => (
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>Simple, fast, and dynamic Redux forms.</P>
    <EditableUserForm />
  </Page>
);

export default app(Forms);
