// @flow
import type { State } from '../types';
// import Button from '../components/button';
// import Checkbox from '../components/checkbox';
// import Fieldset from '../components/fieldset';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
// import Radio from '../components/radio';
import TextInput from '../components/text-input';
import app from '../components/app';
import { connect } from 'react-redux';

const onFormSubmit = () => {
  // TODO: values and reset
  // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
};

const onUserChange = (/* prop, value */) => {
  // console.log(prop, value);
  return {
    type: 'FOO_FIELD',
    // payload: { id, name, value },
  };
};

// TODO: Mix user and onUserChange to get lens dispatches, somehow.
const UserForm = ({ user /* , onUserChange */ }) => (
  <Form onSubmit={onFormSubmit}>
    <TextInput
      // We don't need name attribute. It's useful only for an auth.
      label="Name"
      placeholder="Jane Doe"
      value={user.name}
      // TODO: onUserChange.name or onUserChange('name'), typed.
      onChange={() => {}}
      // onChange={onUserChange.name}
    />
    <TextInput
      label="Description"
      placeholder="..."
      value={user.description}
      onChange={() => {}}
      // onChange={onUserChange.description}
    />
    {/* <Fieldset vertical>
      <Checkbox
        label="I like cats"
        value={user.likesCats}
        onChange={onUserChange.like}
      />
      <Checkbox
        label="I like dogs"
        value={user.likesDogs}
        onChange={onUserChange}
      />
    </Fieldset>
    <Fieldset>
      <Radio label="Female" select="female" onChange={onUserChange} />
      <Radio label="Male" select="male" onChange={onUserChange} />
      <Radio label="Other" select="other" onChange={onUserChange} />
    </Fieldset> */}
    {/* <Fieldset>
      <Checkbox
        color="warning"
        label="Do we need a king?"
        labelOnLeft
        size={1}
        {...fields.userWantsKing}
      />
    </Fieldset>
    <Fieldset>
      <Button primary>Submit</Button>
    </Fieldset> */}
  </Form>
);

const NewUserForm = connect((state: State) => ({ user: state.forms.newUser }), {
  onUserChange,
})(UserForm);

const Forms = () => (
  <Page title="Forms">
    <Heading size={3}>Forms</Heading>
    <P>Simple, fast, and universal Redux forms.</P>
    <NewUserForm />
  </Page>
);

export default app(Forms);
