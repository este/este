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
  // Can't figure out how to type it better :( This doesn't work:
  // type Prop = $Keys<typeof user>;
  const onChange = (prop: string) => state =>
    setUserForm(id, { ...user, [(prop: string)]: state });

  const submit = () => {
    // eslint-disable-next-line no-console
    console.log(user);
    setUserForm(id, null);
  };

  return (
    <Form>
      <TextInput
        // Note we are not using name attribute. It's useful probably only for
        // browser auth pre-filling. Also, it's not universal.
        label="Name"
        placeholder="Jane Doe"
        value={user.name}
        onChange={onChange('name')}
      />
      <TextInput
        label="Description"
        placeholder="..."
        value={user.description}
        onChange={onChange('description')}
      />
      <Fieldset vertical>
        <Checkbox
          label="I like cats"
          value={user.likesCats}
          onChange={onChange('likesCats')}
        />
        <Checkbox
          label="I like dogs"
          value={user.likesDogs}
          onChange={onChange('likesDogs')}
        />
      </Fieldset>
      <Fieldset>
        <Radio
          label="Female"
          select="female"
          value={user.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Male"
          select="male"
          value={user.gender}
          onChange={onChange('gender')}
        />
        <Radio
          label="Other"
          select="other"
          value={user.gender}
          onChange={onChange('gender')}
        />
      </Fieldset>
      <Fieldset>
        <Checkbox
          label="Do we need a king?"
          labelOnLeft
          color="warning"
          size={1}
          value={user.wantsKing}
          onChange={onChange('wantsKing')}
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

// Don't abstract this. It's good as is. We can't predict the future, so we
// can't abstract it. For example, we can compose many forms and actions here.
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
