// @flow
import type { State } from '../types';
// import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Fieldset from '../components/fieldset';
import Form from '../components/form';
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
// import Radio from '../components/radio';
import TextInput from '../components/text-input';
import app from '../components/app';
import { connect } from 'react-redux';
import { setUserForm } from '../lib/forms/actions';

const onFormSubmit = () => {
  // TODO: values and reset
  // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
};

// mix here, becase we want to set one or more or all props in one action.
// it just belongs here, it's fast, blabla
// const theHelper:

const UserForm = ({ id, user, setUserForm }) => (
  <Form onSubmit={onFormSubmit}>
    <TextInput
      label="Name"
      placeholder="Jane Doe"
      value={user.name}
      onChange={value => {
        // TODO: Adhoc factory.
        const newState = {
          ...user,
          name: value,
        };
        setUserForm(id, newState);
      }}
    />
    <TextInput
      label="Description"
      placeholder="..."
      value={user.description}
      onChange={value => {
        // TODO: Adhoc factory.
        const newState = {
          ...user,
          description: value,
        };
        setUserForm(id, newState);
      }}
    />
    {/* <Fieldset vertical>
      <Checkbox
        label="I like cats"
        value={user.likesCats}
        onChange={value => {
          // TODO: Adhoc factory.
          const newState = {
            ...user,
            likesCats: value,
          };
          setUserForm(id, newState);
        }}
      />
      <Checkbox
        label="I like dogs"
        value={user.likesDogs}
        onChange={value => {
          // TODO: Adhoc factory.
          const newState = {
            ...user,
            likesDogs: value,
          };
          setUserForm(id, newState);
        }}
      />
    </Fieldset> */}
    {/* <Fieldset>
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

const EditableUserForm = connect(
  ({ forms: { user } }: State) => ({
    id: '',
    user: user.changes[''] || user.initialState,
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
